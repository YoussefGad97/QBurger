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
    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    if (basketItems.length === 0) {
      navigate('/basket');
    }
  }, [basketItems, navigate]);

  const calculateTotal = () => {
    return basketItems.reduce((total, item) => total + item.price, 0);
  };

  const calculateSubtotal = () => {
    return basketItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    // Validate credit card fields if credit card is selected
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number';
      }
      
      if (!formData.cardExpiry.trim()) {
        newErrors.cardExpiry = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Invalid expiry date (MM/YY)';
      }
      
      if (!formData.cardCVC.trim()) {
        newErrors.cardCVC = 'CVC is required';
      } else if (!/^\d{3,4}$/.test(formData.cardCVC)) {
        newErrors.cardCVC = 'Invalid CVC';
      }
      
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Name on card is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
    }
    // Format expiry date
    else if (name === 'cardExpiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .substr(0, 5);
    }
    // Format CVC
    else if (name === 'cardCVC') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
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

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EGP'
    }).format(amount);
  };

  const handleEmailReceipt = async () => {
    try {
      setIsEmailSent(true);
      // In a real application, you would make an API call here to send the email
      // For now, we'll just simulate the success
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const handleCloseAndNavigate = () => {
    clearBasket();
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
      const orderDate = new Date().toISOString();
      
      const orderData = {
        orderId,
        orderDate,
        items: basketItems,
        deliveryDetails: formData,
        paymentMethod: formData.paymentMethod,
        total: calculateTotal(),
        subtotal: calculateSubtotal(),
        deliveryFee: 30
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOrderDetails(orderData);
      setShowSuccessMessage(true);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit order. Please try again.'
      }));
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
          className={`payment-option ${formData.paymentMethod === 'cash' ? 'selected' : ''}`}
          onClick={() => handleInputChange({ target: { name: 'paymentMethod', value: 'cash' } })}
        >
          <i className="fas fa-money-bill-wave"></i>
          <span>Cash on Delivery</span>
          <p>Pay when your order arrives</p>
        </div>
        <div 
          className={`payment-option ${formData.paymentMethod === 'credit-card' ? 'selected' : ''}`}
          onClick={() => handleInputChange({ target: { name: 'paymentMethod', value: 'credit-card' } })}
        >
          <i className="fas fa-credit-card"></i>
          <span>Credit Card</span>
          <p>Pay securely with your card</p>
        </div>
      </div>
      {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}
      
      {formData.paymentMethod === 'credit-card' && (
        <div className="credit-card-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className={errors.cardNumber ? 'error' : ''}
            />
            {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cardExpiry">Expiry Date</label>
              <input
                type="text"
                id="cardExpiry"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength="5"
                className={errors.cardExpiry ? 'error' : ''}
              />
              {errors.cardExpiry && <span className="error-message">{errors.cardExpiry}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="cardCVC">CVC</label>
              <input
                type="text"
                id="cardCVC"
                name="cardCVC"
                value={formData.cardCVC}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="4"
                className={errors.cardCVC ? 'error' : ''}
              />
              {errors.cardCVC && <span className="error-message">{errors.cardCVC}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="cardName">Name on Card</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className={errors.cardName ? 'error' : ''}
            />
            {errors.cardName && <span className="error-message">{errors.cardName}</span>}
          </div>
        </div>
      )}
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

        {showSuccessMessage && orderDetails && (
          <div className="success-overlay">
            <div className="success-modal">
              <div className="success-header">
                <i className="fas fa-check-circle"></i>
                <h2>Thank You for Your Order!</h2>
                <p>Your order has been successfully placed</p>
              </div>

              <div className="order-receipt">
                <div className="receipt-header">
                  <h3>Order Receipt</h3>
                  <div className="order-info">
                    <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                    <p><strong>Date:</strong> {formatDate(orderDetails.orderDate)}</p>
                  </div>
                </div>

                <div className="receipt-items">
                  <h4>Order Items</h4>
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="receipt-item">
                      <div className="item-details">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                      </div>
                      <span className="item-price">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="receipt-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{formatCurrency(orderDetails.subtotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Fee</span>
                    <span>{formatCurrency(orderDetails.deliveryFee)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>{formatCurrency(orderDetails.total)}</span>
                  </div>
                </div>

                <div className="delivery-details">
                  <h4>Delivery Details</h4>
                  <p><strong>Name:</strong> {orderDetails.deliveryDetails.fullName}</p>
                  <p><strong>Address:</strong> {orderDetails.deliveryDetails.address}</p>
                  <p><strong>City:</strong> {orderDetails.deliveryDetails.city}</p>
                  <p><strong>Phone:</strong> {orderDetails.deliveryDetails.phone}</p>
                  <p><strong>Payment Method:</strong> {orderDetails.paymentMethod === 'credit-card' ? 'Credit Card' : 'Cash on Delivery'}</p>
                </div>
              </div>

              <div className="success-actions">
                <button 
                  className={`email-button ${isEmailSent ? 'sent' : ''}`} 
                  onClick={handleEmailReceipt}
                  disabled={isEmailSent}
                >
                  {isEmailSent ? (
                    <>
                      <i className="fas fa-check"></i>
                      Email Sent!
                    </>
                  ) : (
                    <>
                      <i className="fas fa-envelope"></i>
                      Email Receipt
                    </>
                  )}
                </button>
                <button className="close-button" onClick={handleCloseAndNavigate}>
                  <i className="fas fa-home"></i>
                  Return to Home
                </button>
              </div>
            </div>
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
