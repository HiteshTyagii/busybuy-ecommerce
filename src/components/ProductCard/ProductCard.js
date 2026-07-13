import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { user } = useAuth() || { user: null };
  const { addToCart, removeFromCart, changeQuantity } = useCart() || { addToCart: ()=>{}, removeFromCart: ()=>{}, changeQuantity: ()=>{} };
  const location = useLocation();
  const navigate = useNavigate();

  const isCartPage = location.pathname === '/cart';


  const handleAddToCart = async () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    await addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title" title={product.title}>{product.title}</h3>
        <p className="product-price">₹{product.price}</p>
        
        {isCartPage ? (
          <div className="cart-actions">
            <div className="quantity-controls">
              <button className="qty-btn" onClick={() => changeQuantity(product.id, -1)}>-</button>
              <span className="qty-value">{product.quantity}</span>
              <button className="qty-btn" onClick={() => changeQuantity(product.id, 1)}>+</button>
            </div>
            <button className="btn-remove" title="Remove from Cart" onClick={handleRemoveFromCart}>
              Remove From Cart
            </button>
          </div>
        ) : (
          <button className="btn-add" title="Add to Cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
