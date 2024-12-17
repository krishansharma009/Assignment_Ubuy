'use client'
import { useState, useEffect } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]); 

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

 
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Product List</h1>

     
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 border rounded mb-4"
      />

     
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-bold mb-2">{product.title}</h2>
              <p className="text-sm mb-2">{product.description}</p>
              <p className="font-semibold">Price: ${product.price}</p>
              <p className="text-gray-500">Category: {product.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No products found.</p>
      )}
    </div>
  );
}
