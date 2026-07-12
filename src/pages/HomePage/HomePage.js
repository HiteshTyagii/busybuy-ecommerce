import React from 'react';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductList from '../../components/Product/ProductList/ProductList';
import { useProduct } from '../../context/ProductContext';
import ClipLoader from 'react-spinners/ClipLoader';
import './HomePage.css';

const HomePage = () => {
  const { filteredProducts, loading, searchQuery, setSearchQuery } = useProduct();

  return (
    <div className="homepage-container">
      <FilterSidebar />
      <div className="main-content">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder="Search By Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>
        
        {loading ? (
          <div className="loader-container">
            <ClipLoader color="#6366f1" size={50} />
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              <ProductList products={filteredProducts} />
            ) : (
              <p className="no-data">No products found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
