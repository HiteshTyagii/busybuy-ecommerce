import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import localData from '../utils/data';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState(75000);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      // If we are using the demo Firebase keys, skip Firebase so it doesn't hang indefinitely.
      if (db.app.options.apiKey === "demo-api-key") {
        setProducts(localData);
        setLoading(false);
        return;
      }

      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        
        if (querySnapshot.empty) {
          // Seed database
          const batchProducts = localData.map(async (item) => {
            const docRef = doc(db, 'products', item.id.toString());
            await setDoc(docRef, item);
            return item;
          });
          await Promise.all(batchProducts);
          setProducts(localData);
        } else {
          const fetchedProducts = querySnapshot.docs.map(doc => doc.data());
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching from Firebase (using dummy keys?):", error);
        // Fallback to local data so the app doesn't hang
        setProducts(localData);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= priceFilter;
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  const value = {
    products,
    loading,
    searchQuery,
    setSearchQuery,
    priceFilter,
    setPriceFilter,
    selectedCategories,
    toggleCategory,
    filteredProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
