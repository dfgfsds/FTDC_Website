import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CategoryContext = createContext<any>(undefined);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fetchCategory = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/categories/?vendor_id=18`);
  return res.data;
};

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });

  return (
    <CategoryContext.Provider value={{ category: data, isLoading, isError }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("useCategoryContext must be used within CategoryProvider");
  return context;
};
