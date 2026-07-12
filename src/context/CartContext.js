import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useAuth() || { user: null };

  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        const querySnapshot = await getDocs(collection(db, `users/${user.uid}/cart`));
        const cartItems = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setCart(cartItems);
      };
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  }, [cart]);

  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please login first");
      return false;
    }

    try {
      const existingItem = cart.find(item => item.id === product.id.toString());
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        setCart(cart.map(item => item.id === product.id.toString() ? { ...item, quantity: newQuantity } : item));
        updateDoc(doc(db, `users/${user.uid}/cart`, product.id.toString()), {
          quantity: newQuantity
        }).catch(console.warn);
      } else {
        const newItem = { ...product, quantity: 1 };
        setCart([...cart, { ...newItem, id: product.id.toString() }]);
        setDoc(doc(db, `users/${user.uid}/cart`, product.id.toString()), newItem).catch(console.warn);
      }
      toast.success("Product Added Successfully");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    setCart(cart.filter(item => item.id !== productId.toString()));
    deleteDoc(doc(db, `users/${user.uid}/cart`, productId.toString())).catch(console.warn);
  };

  const changeQuantity = async (productId, amount) => {
    const existingItem = cart.find(item => item.id === productId.toString());
    if (!existingItem) return;

    const newQuantity = existingItem.quantity + amount;
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => item.id === productId.toString() ? { ...item, quantity: newQuantity } : item));
      updateDoc(doc(db, `users/${user.uid}/cart`, productId.toString()), {
        quantity: newQuantity
      }).catch(console.warn);
    }
  };

  const clearCart = async () => {
    for (let item of cart) {
      deleteDoc(doc(db, `users/${user.uid}/cart`, item.id)).catch(console.warn);
    }
    setCart([]);
  };

  const value = {
    cart,
    totalPrice,
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
