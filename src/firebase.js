import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnkB9vrUSrVD-Ur1qc5yPm_YRXgemJDe0",
  authDomain: "qburger-43fbf.firebaseapp.com",
  projectId: "qburger-43fbf",
  storageBucket: "qburger-43fbf.appspot.com",
  messagingSenderId: "882215380334",
  appId: "1:882215380334:web:ea470e38d7e6ee55f6cd7f",
  measurementId: "G-24SKRZC60H"
};

// Initialize Firebase and services
let firebaseApp;
let auth;
let db;
let analytics;

try {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
  analytics = getAnalytics(firebaseApp);
  
  // Log successful initialization
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

// Export initialized services
export { auth, db, analytics, firebaseApp }; 