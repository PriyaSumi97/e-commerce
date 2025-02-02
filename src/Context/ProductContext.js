import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => setProducts(res.data));
    axios.get("https://fakestoreapi.com/products/categories").then((res) => setCategories(res.data));
  }, []);

  return <ProductContext.Provider value={{ products, categories }}>{children}</ProductContext.Provider>;
};

export const useProducts = () => useContext(ProductContext);