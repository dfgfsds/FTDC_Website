import React, { createContext, useContext } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CartContextType = {
  cartItems: any;
  decreaseQuantity: any;
  increaseQuantity: any;
  isLoading: boolean;
  refetchCart: () => void;
  addToCart: (item: { product_id: number; quantity: number }) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userId = localStorage.getItem("user_id");
  const vendorId = 18; // You can make this dynamic if needed
  const queryClient = useQueryClient();


  const {
    data: cartItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cartItems", userId, vendorId],
    queryFn: async () => {
      // const res = await axios.get(`${API_BASE_URL}/cart_with_cart_items_products/`, {
      const res = await axios.get(`${API_BASE_URL}/cart_with_cart_items_product_or_variant/`, {
        params: {
          user_id: userId,
          vendor_id: vendorId,
        },
      });
      return res.data;
    },
    enabled: !!userId, // only run if userId exists
  });

  const refetchCart = () => {
    refetch();
  };

  const addToCart = async (item: { product_id: number; quantity: number }) => {
    const userId = localStorage.getItem("user_id");
    const payload = {
      product: item.product_id,
      vendor: String(vendorId),
      user: userId,
      created_by: "user",
      cart: localStorage.getItem("cart_id"),
      quantity: String(item.quantity),
    };
    try {
      await axios.post(`${API_BASE_URL}/product-variant-cart-item/update/`, payload);
      queryClient.invalidateQueries({ queryKey: ["cartItems", userId, vendorId] });
      refetchCart()
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };
  const increaseQuantity = async (item: { product_id: any; quantity: any }) => {
    console.log(item, "item");

    const payload = {
      product: item.product_id,
      vendor: String(vendorId),
      user: userId,
      created_by: "user",
      cart: localStorage.getItem("cart_id"),
      quantity: item.quantity,
    };
    try {
      await axios.post(`${API_BASE_URL}/product-variant-cart-item/update/`, payload);
      queryClient.invalidateQueries({ queryKey: ["cartItems", userId, vendorId] });
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };


  const decreaseQuantity = async (item: { product_id: number }) => {
    const payload = {
      product: item.product_id,
      vendor: String(vendorId),
      user: userId,
      updated_by: "user",
      cart: localStorage.getItem("cart_id"),
    };

    try {
      await axios.delete(`${API_BASE_URL}/product-variant-cart-item/update/`, {
        data: payload,
      });

      queryClient.invalidateQueries({ queryKey: ["cartItems", userId, vendorId] });
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  const updateCartItem = async (itemId: number, quantity: number) => {
    try {
      await axios.put(`${API_BASE_URL}/api/cart_items/${itemId}/`, { quantity });
      queryClient.invalidateQueries({ queryKey: ["cartItems", userId, vendorId] });
    } catch (err) {
      console.error("Error updating cart item:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, isLoading, refetchCart, addToCart, updateCartItem, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
