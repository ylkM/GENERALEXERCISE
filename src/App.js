import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import './App.css';

function App() {
  const initialProductsData = [
    { title: "cabbage", id: uuidv4() },
    { title: "garlic", id: uuidv4() },
    { title: "apple", id: uuidv4() }
  ];

  const [products, setProducts] = useState(initialProductsData);
  const [product, setProduct] = useState("");
  const [search, setSearch] = useState("");
  const [isSearchNotFound, setIsSearchNotFound] = useState(false);

  const handleProduct = (e) => {
    setProduct(e.target.value);
  };

  const handleSubmit = () => {
    const prodObj = {
      title: product,
      id: uuidv4() // You need to call the function here to generate a new ID
    };
    setProducts([...products, prodObj]);
    setProduct(""); // Clear the input field after submitting
  };

  const resetProducts = () => {
    setProducts(initialProductsData);
    setSearch("");
    setIsSearchNotFound(false);
  };

  const handleSearch = () => {
    const filteredProduct = initialProductsData.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });

    if (filteredProduct.length < 1) {
      setIsSearchNotFound(true);
    }

    setProducts(filteredProduct);
  };

  const productList = products.map((product) => (
    <ul key={product.id}>
      <li>{product.title}</li>
    </ul>
  ));

  return (
    <div>
      <h3>Our products</h3>
      {productList}
      <h3>Add product</h3>
      {isSearchNotFound && <p>Search not found</p>}
      <input type="text" name="product" value={product} onChange={handleProduct} />
      <input type="button" value="Submit" onClick={handleSubmit} />
      <div style={{ marginTop: "2rem" }}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type="button" value="Search" onClick={handleSearch} />
        <input type="button" value="Reset" onClick={resetProducts} />
      </div>
    </div>
  );
}

export default App;
