import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Create the context
const UsersContext = createContext<any>(undefined);

// Base URL and user ID
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const userId = localStorage.getItem("user_id");

// Query key with const assertion
export const USERS_QUERY_KEY = ["users"] as const;

// Fetch user data
// const fetchUsers = async () => {
//     if (!userId) throw new Error("User ID not found");
//     const res = await axios.get(`${API_BASE_URL}/users/${userId}/`);
//     return res.data;
// };
const fetchUsers = async () => {
    try {
        const userId = localStorage.getItem("user_id");

        if (!userId) {
            throw new Error("User ID is missing in localStorage.");
        }

        const response = await axios.get(`${API_BASE_URL}/users/${userId}/`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching user data:", error);
        throw new Error(error?.response?.data?.error || "Failed to fetch user data");
    }
};

// Update user data
const updateUserRequest = async (updatedData: any) => {
    if (!userId) throw new Error("User ID not found");
    const res = await axios.patch(`${API_BASE_URL}/users/${userId}/`, updatedData);
    fetchUsers()
    return res.data;
};

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();

    // Fetch user data
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: USERS_QUERY_KEY,
        queryFn: fetchUsers,
    });

    // Mutation for updating user
    const {
        mutate: updateUser,
        isPending: isUpdating,  // ✅ Corrected
        isError: isUpdateError,
        isSuccess: isUpdateSuccess,
    } = useMutation({
        mutationFn: updateUserRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
        },
    });

    return (
        <UsersContext.Provider
            value={{
                userData: data,
                isLoading,
                isError,
                updateUser,
                isUpdating,
                isUpdateError,
                isUpdateSuccess,
                refetchUser: refetch,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

// Custom hook
export const useUsersContext = () => {
    const context = useContext(UsersContext);
    if (!context) throw new Error("useUsersContext must be used within UsersProvider");
    return context;
};

export { fetchUsers, updateUserRequest };
