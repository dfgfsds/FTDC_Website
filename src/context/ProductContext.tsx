import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProductContext = createContext<any>(undefined);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fetchProducts = async () => {
  const res = await axios.get(`${API_BASE_URL}/product_with_image_url_controller/?vendor_id=18`);
  return res.data;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <ProductContext.Provider value={{ products: data, isLoading, isError }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProductContext must be used within ProductProvider");
  return context;
};
