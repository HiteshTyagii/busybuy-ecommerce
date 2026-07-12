import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth() || { user: null };
  const { cart, totalPrice, clearCart } = useCart() || { cart: [], totalPrice: 0, clearCart: () => {} };

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const querySnapshot = await getDocs(collection(db, `users/${user.uid}/orders`));
        const userOrders = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        // Sort by date descending
        userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(userOrders);
      };
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  const purchase = async () => {
    if (!user || cart.length === 0) return;

    const newOrder = {
      items: cart,
      totalPrice,
      date: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, `users/${user.uid}/orders`), newOrder);
    setOrders([{ ...newOrder, id: docRef.id }, ...orders]);
    await clearCart();
  };

  const value = {
    orders,
    purchase
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
