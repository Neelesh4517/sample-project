import React, { useState } from "react";
import "./OrderCompletion.css";

type CartItem = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
};

type OrderCompletionProps = {
  cartItems: CartItem[];
  onBack: () => void;
};

const OrderCompletion: React.FC<OrderCompletionProps> = ({ cartItems, onBack }) => {
  const [discount, setDiscount] = useState<number>(0);
  const [serviceTotal] = useState<number>(1800); 
console.log(onBack,"back")
  // Calculate totals
  const productTotal = cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  const discountAmount = (serviceTotal + productTotal) * (discount / 100);
  const subtotal = serviceTotal + productTotal - discountAmount;
  const tax = subtotal * 0.18; // 18% tax
  const finalTotal = subtotal + tax;

  // const updateQuantity = (id: number, newQuantity: number) => {
  // };

  const removeItem = (id: number) => {
    console.log(id,"id")
  };

  return (
    <div className="order-completion-page">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <img src="\src\assets\logo.png" className="logo"></img>
          <div className="welcome-text">
            <span className="welcome">Welcome Back, Rajesh</span>
            <span className="subtitle">
              Hello, here you can manage your orders by zone
            </span>
          </div>
        </div>

        <div className="header-center">
          <input
            type="text"
            placeholder="Q Search..."
            className="search-input"
          />
        </div>

        <div className="header-right">
          <button className="icon-btn">🔔</button>
          <button className="profile-btn">AD</button>
          <span className="profile-text">Profile</span>
        </div>
      </header>
      <div className="order-content">
        <div className="order-section">
          <div className="section-header">
            <h2 className="section-title">Order Completion</h2>
            <p className="section-subtitle">Booking Summary - APT-001</p>
          </div>

          <div className="products-section">
            <h3 className="products-title">Products Used</h3>
            
            {cartItems.map((item) => (
              <div key={item.id} className="product-item">
                <div className="product-info">
                  <div className="product-details">
                    <h4 className="product-name">{item.name}</h4>
                    <div className="product-meta">
                      <span className="quantity">Qty: {item.quantity}</span>
                      <span className="unit-price">Unit Price: ₹{item.unitPrice}</span>
                      <span className="total-price">Total: ₹{item.unitPrice * item.quantity}</span>
                    </div>
                  </div>
                  <div className="product-actions">
                    <button className="edit-btn" title="Edit">✏️</button>
                    <button className="delete-btn" onClick={() => removeItem(item.id)} title="Delete">🗑️</button>
                    <button className="discount-btn">Special Discount</button>
                  </div>
                </div>
              </div>
            ))}

            <button className="add-extra-btn">
              + Add Extra Products
            </button>
          </div>
        </div>
        <div className="billing-section">
          <h2 className="billing-title">Billing Summary</h2>
          
          <div className="billing-details">
            <div className="billing-row">
              <span className="label">Service Total:</span>
              <span className="value">₹{serviceTotal}</span>
            </div>
            
            <div className="billing-row">
              <span className="label">Product Total:</span>
              <span className="value">₹{productTotal}</span>
            </div>
            
            <div className="billing-row">
              <span className="label">Order Discount (%):</span>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="discount-input"
                min="0"
                max="100"
              />
            </div>
            
            <div className="billing-row">
              <span className="label">Tax (18%):</span>
              <span className="value">₹{tax.toFixed(2)}</span>
            </div>
            
            <div className="billing-row final-total">
              <span className="label">Final Total:</span>
              <span className="value">₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="complete-payment-btn">
            ✨ Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletion;
