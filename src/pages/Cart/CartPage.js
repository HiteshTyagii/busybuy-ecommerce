import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CartPage.css';

const CartPage = () => {
  const { cart, totalPrice, removeFromCart, changeQuantity } = useCart() || { cart: [], totalPrice: 0, removeFromCart: () => {}, changeQuantity: () => {} };
  const { purchase } = useOrder() || { purchase: () => {} };
  const navigate = useNavigate();

  const handlePurchase = async () => {
    await purchase();
    navigate('/myorders');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty!</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <aside className="cart-summary">
        <h2>Total Price: ₹{totalPrice}/-</h2>
        <button className="purchase-btn" onClick={handlePurchase}>Purchase</button>
      </aside>
      <div className="cart-items">
        {cart.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default CartPage;
