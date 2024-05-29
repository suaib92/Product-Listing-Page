// pages/index.js

"use client"

// pages/index.js

import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../lib/api';
import ProductModal from '../components/ProductModal';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    async function getProducts() {
      const products = await fetchProducts();
      setProducts(products);
      setFilteredProducts(products);
      setLoading(false); // Set loading to false once data is fetched
    }
    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-FBFAEF via-E6DBA1 to-D8C46F">
      <div className="container mx-auto px-4 py-6">
        <input
          type="text"
          placeholder="Search products..."
          className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ backgroundColor: '#FBFAEF', color: '#382010' }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            // Placeholder skeleton UI until data is fetched
            <>
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
            </>
          ) : (
            // Render actual product cards when data is available
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg shadow hover:shadow-lg cursor-pointer"
                onClick={() => setSelectedProduct(product)}
                style={{ backgroundColor: '#F3EDD2', borderColor: '#CFB250' }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4 rounded-lg"
                />
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-700">${product.price}</p>
              </div>
            ))
          )}
        </div>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </div>
    </div>
  );
};

// Placeholder skeleton UI component
const LoadingProductCard = () => (
  <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto animate-pulse">
    <div className="flex space-x-4">
      <div className="rounded-full bg-slate-200 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
