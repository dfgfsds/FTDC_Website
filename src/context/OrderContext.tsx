import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OrdersContext = createContext<any>(undefined);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fetchOrders = async () => {
  const userId = localStorage.getItem("user_id");
  if (userId) {
    const res = await axios.get(`${API_BASE_URL}/fetch-order-and-order-items-by-user-vendor/?vendor_id=18&user_id=${userId}`);
    return res.data;
  }
};


export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  return (
    <OrdersContext.Provider value={{ Orders: data, isLoading, isError }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrdersContext = () => {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrdersContext must be used within OrdersProvider");
  return context;
};
