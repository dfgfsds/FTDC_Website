import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { USERS_QUERY_KEY, useUsersContext } from "./UserContext";

type AuthContextType = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  registerUser: (userData: RegisterData) => Promise<void>;
  logout: () => void;
};

type RegisterData = {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { refetchUser } = useUsersContext();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const { refetchCart } = useCart();
  const queryClient = useQueryClient();
  useEffect(() => {
    localStorage.setItem("isLoggedIn", String(isLoggedIn));
  }, [isLoggedIn]);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/user_login/`, {
        email,
        password,
        vendor_id: 18,
      });

      // if (res?.data) {
      //   setIsLoggedIn(true);
      //   localStorage.setItem("isLoggedIn", "true");
      //   localStorage.setItem("user_id", res.data.user_id);
      //   // fetchUsers()
      //   const userId = localStorage.getItem("user_id");
      //   if (userId) {
      //     refetchCart();
      //     refetchUser()
      //     // ✅ Directly call your cart API
      //     const cartRes = await axios.get(`${API_BASE_URL}/api/carts/user/${userId}`);
      //     localStorage.setItem("cart_id", cartRes?.data[0]?.id);
      //     await queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      //   }
      // }
      if (res?.data) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user_id", res.data.user_id);

        const userId = res.data.user_id;

        if (userId) {
          refetchCart();
          refetchUser();
          const cartRes = await axios.get(`${API_BASE_URL}/api/carts/user/${userId}/`);
          localStorage.setItem("cart_id", cartRes?.data[0]?.id);
          await queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
        }
      }
    } catch (err: any) {
      throw new Error(err?.response?.data?.error || "Login failed");
    }
  };

  const registerUser = async (userData: RegisterData) => {
    const payload = {
      name: userData?.name,
      email: userData?.email,
      password: userData?.password,
      contact_number: userData?.contact,
      created_by: "user",
      vendor: 18,
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/create_users/`, payload);
      if (res?.data) {
        const userId = res.data.user.id;
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user_id", userId);
        refetchUser()

        // ✅ Post to /api/carts with user_id
        const cartRes = await axios.post(`${API_BASE_URL}/api/carts/`, {
          user: userId,
          vendor: '18',
          created_by: 'user'
        });

        localStorage.setItem("cart_id", cartRes?.data?.id)
      }

    } catch (err: any) {
      throw new Error(err?.response?.data?.error || "Registration failed");
    }
  };

  const logout = () => {
    // ✅ Clear all React Query cache
    queryClient.clear();
    // ✅ Correct way: clear the query cache
    // queryClient.removeQueries({ queryKey: ["cartItems"] });
    localStorage.removeItem("user_id");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("cart_id");

    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
