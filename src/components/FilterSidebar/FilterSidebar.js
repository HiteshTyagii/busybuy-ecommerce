import React from "react";
import styles from "./FilterSidebar.module.css";
import { useProduct } from "../../context/ProductContext";

const FilterSidebar = () => {
  const { priceFilter, setPriceFilter, selectedCategories, toggleCategory } = useProduct();

  return (
    <aside className={styles.filterContainer}>
      <h2>Filter</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="price">Price: {priceFilter}</label>
        <input
          type="range"
          id="price"
          name="price"
          min="1"
          max="100000"
          className={styles.priceRange}
          step="10"
          value={priceFilter}
          onChange={(e) => setPriceFilter(Number(e.target.value))}
        />
        <h2>Category</h2>
        <div className={styles.categoryContainer}>
          <div className={styles.inputContainer}>
            <input
              type="checkbox"
              id="mensFashion"
              name="mensFashion"
              checked={selectedCategories.includes("men's clothing")}
              onChange={() => toggleCategory("men's clothing")}
            />
            <label htmlFor="mensFashion">Men's Clothing</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="checkbox"
              id="womensFashion"
              name="womensFashion"
              checked={selectedCategories.includes("women's clothing")}
              onChange={() => toggleCategory("women's clothing")}
            />
            <label htmlFor="womensFashion">Women's Clothing</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="checkbox"
              id="jewelery"
              name="jewelery"
              checked={selectedCategories.includes("jewelery")}
              onChange={() => toggleCategory("jewelery")}
            />
            <label htmlFor="jewelery">Jewelery</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="checkbox"
              id="electronics"
              name="electronics"
              checked={selectedCategories.includes("electronics")}
              onChange={() => toggleCategory("electronics")}
            />
            <label htmlFor="electronics">Electronics</label>
          </div>
        </div>
      </form>
    </aside>
  );
};

export default FilterSidebar;
