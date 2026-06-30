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
  const { user } = useAuth();

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
        // Increase quantity
        const newQuantity = existingItem.quantity + 1;
        await updateDoc(doc(db, `users/${user.uid}/cart`, product.id.toString()), {
          quantity: newQuantity
        });
        setCart(cart.map(item => item.id === product.id.toString() ? { ...item, quantity: newQuantity } : item));
      } else {
        // Add new item
        const newItem = { ...product, quantity: 1 };
        await setDoc(doc(db, `users/${user.uid}/cart`, product.id.toString()), newItem);
        setCart([...cart, { ...newItem, id: product.id.toString() }]);
      }
      toast.success("Product Added Successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Error adding to cart: " + error.message);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    await deleteDoc(doc(db, `users/${user.uid}/cart`, productId.toString()));
    setCart(cart.filter(item => item.id !== productId.toString()));
  };

  const changeQuantity = async (productId, amount) => {
    const existingItem = cart.find(item => item.id === productId.toString());
    if (!existingItem) return;

    const newQuantity = existingItem.quantity + amount;
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      await updateDoc(doc(db, `users/${user.uid}/cart`, productId.toString()), {
        quantity: newQuantity
      });
      setCart(cart.map(item => item.id === productId.toString() ? { ...item, quantity: newQuantity } : item));
    }
  };

  const clearCart = async () => {
    for (let item of cart) {
      await deleteDoc(doc(db, `users/${user.uid}/cart`, item.id));
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
