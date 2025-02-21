import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../contexts/BasketContext';
import '../styles/Checkout.scss';

const Checkout = () => {
  const navigate = useNavigate();
  const { basketItems, clearBasket } = useBasket();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (basketItems.length === 0) {
      navigate('/basket');
    }
  }, [basketItems, navigate]);

  const calculateTotal = () => {
    return basketItems.reduce((total, item) => total + item.price, 0);
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01[0125][0-9]{8}$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Egyptian phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const orderData = {
        items: basketItems,
        deliveryDetails: formData,
        paymentMethod,
        total: calculateTotal(),
        orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
        orderDate: new Date().toISOString()
      };

      console.log('Order submitted:', orderData);
      setShowSuccessMessage(true);
      clearBasket();
      
      // Redirect to orders page after showing success message
      setTimeout(() => {
        navigate('/orders', { 
          state: { 
            orderSuccess: true,
            orderId: orderData.orderId
          }
        });
      }, 2000);

    } catch (error) {
      console.error('Order submission error:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit order. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDeliveryForm = () => (
    <div className="delivery-form">
      <h3>Delivery Details</h3>
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className={errors.fullName ? 'error' : ''}
          placeholder="Enter your full name"
        />
        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'error' : ''}
          placeholder="Enter your email address"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={errors.phone ? 'error' : ''}
          placeholder="Enter your phone number (e.g., 01012345678)"
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="address">Delivery Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className={errors.address ? 'error' : ''}
          placeholder="Enter your full delivery address"
          rows="3"
        />
        {errors.address && <span className="error-message">{errors.address}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className={errors.city ? 'error' : ''}
          placeholder="Enter your city"
        />
        {errors.city && <span className="error-message">{errors.city}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="notes">Additional Notes (Optional)</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Any special instructions for delivery?"
          rows="2"
        />
      </div>
    </div>
  );

  const renderPaymentMethod = () => (
    <div className="payment-method">
      <h3>Payment Method</h3>
      <div className="payment-options">
        <div
          className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`}
          onClick={() => handlePaymentMethodChange('cash')}
        >
          <i className="fas fa-money-bill-wave"></i>
          <span>Cash on Delivery</span>
          <p>Pay when you receive your order</p>
        </div>
        <div
          className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
          onClick={() => handlePaymentMethodChange('card')}
        >
          <i className="fas fa-credit-card"></i>
          <span>Credit Card</span>
          <p>Coming soon!</p>
        </div>
      </div>
    </div>
  );

  const renderOrderSummary = () => (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="items-list">
        {basketItems.map((item, index) => (
          <div key={index} className="order-item">
            <div className="item-info">
              <h4>{item.name}</h4>
              <p>{item.pattyType}</p>
            </div>
            <span className="item-price">{item.price.toFixed(2)} L.E</span>
          </div>
        ))}
      </div>
      <div className="total">
        <span>Total Amount</span>
        <span>{calculateTotal().toFixed(2)} L.E</span>
      </div>
    </div>
  );

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h2>Checkout</h2>
        
        <div className="checkout-steps">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-text">Delivery</span>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-text">Payment</span>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-text">Review</span>
          </div>
        </div>

        <div className="checkout-grid">
          <div className="checkout-main">
            <form onSubmit={handleSubmit}>
              {renderDeliveryForm()}
              {renderPaymentMethod()}
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="checkout-sidebar">
            {renderOrderSummary()}
          </div>
        </div>

        {showSuccessMessage && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            <h3>Order Placed Successfully!</h3>
            <p>Redirecting to orders page...</p>
          </div>
        )}

        {errors.submit && (
          <div className="error-message global">
            <i className="fas fa-exclamation-circle"></i>
            {errors.submit}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
