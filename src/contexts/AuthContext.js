import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Check if email or username already exists
      const existingUser = users.find(u => 
        u.email === userData.email || u.username === userData.username
      );
      
      if (existingUser) {
        throw new Error('Email or username already exists');
      }

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        password: userData.password, // In real app, this should be hashed
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        profilePic: '',
        phone: '',
        address1: '',
        address2: '',
        address3: ''
      };

      // Save to localStorage
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);

      return newUser;
    } catch (error) {
      throw new Error(error.message || 'Failed to create account');
    }
  };

  const login = async (identifier, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => 
        // Check if identifier matches email, username, or phone
        (u.email === identifier || 
         u.username === identifier || 
         u.phone === identifier) && 
        u.password === password
      );

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Only store essential user data
      const minimalUserData = {
        uid: user.uid,
        email: user.email,
        // Add other essential fields
      };

      localStorage.setItem('currentUser', JSON.stringify(minimalUserData));
      setUser(user);
      return user;
    } catch (error) {
      throw new Error(error.message || 'Failed to log in');
    }
  };

  const logout = async () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateUser = async (updatedData) => {
    try {
      // Check if user exists
      if (!user || !user.id) {
        throw new Error('No user logged in');
      }

      // Get current users from localStorage
      let users = [];
      try {
        const usersData = localStorage.getItem('users');
        users = usersData ? JSON.parse(usersData) : [];
      } catch (parseError) {
        console.error('Error parsing users data:', parseError);
        throw new Error('Failed to read user data');
      }

      // Find the user index
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex === -1) {
        throw new Error('User not found in database');
      }

      // Create updated user object
      // Remove any undefined or null values
      const cleanedData = Object.fromEntries(
        Object.entries(updatedData).filter(([_, value]) => value !== null && value !== undefined)
      );

      const updatedUser = {
        ...users[userIndex],
        ...cleanedData,
        updatedAt: new Date().toISOString()
      };

      // Update users array
      users[userIndex] = updatedUser;

      // Check localStorage space before saving
      try {
        const usersString = JSON.stringify(users);
        const currentUserString = JSON.stringify(updatedUser);

        // Test if we can store the data
        localStorage.setItem('users_test', usersString);
        localStorage.removeItem('users_test');

        // If test passes, save the actual data
        localStorage.setItem('users', usersString);
        localStorage.setItem('currentUser', currentUserString);
        
        // Update state
        setUser(updatedUser);
        return true;
      } catch (storageError) {
        console.error('Storage error:', storageError);
        if (storageError.name === 'QuotaExceededError' || 
            storageError.code === 22 || 
            storageError.code === 1014) {
          throw new Error('Profile picture is too large. Please choose a smaller image.');
        }
        throw new Error('Failed to save profile updates');
      }

    } catch (error) {
      console.error('Update error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  function cleanupLocalStorage() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (!['currentUser', 'authToken'].includes(key)) {
        localStorage.removeItem(key);
      }
    });
  }

  const value = {
    user,
    signup,
    login,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 