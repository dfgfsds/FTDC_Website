import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface Address {
    id?: number;
    user: number;
    email_address: string;
    customer_name: string;
    address_type: string;
    contact_number: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    landmark: string;
    updated_by?: string;
}

interface AddressContextType {
    address: any;
    loading: boolean;
    getAddress: () => void;
    addAddress: (data: Omit<Address, "id">) => void;
    updateAddress: (data: Address) => void;
    deleteAddress: (id: any) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [address, setAddress] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    const getAddress = async () => {
        setLoading(true);
        const user_id = localStorage.getItem("user_id");
        try {
            const res = await axios.get(`${API_BASE_URL}/addresses/user/${user_id}/`);
            setAddress(res.data);
        } catch {
            setAddress(null);
        } finally {
            setLoading(false);
        }
    };

    const addAddress = async (data: Omit<Address, "id">) => {
        const res = await axios.post(`${API_BASE_URL}/addresses/`, data);
        setAddress(res.data);
        getAddress()
    };

    const updateAddress = async (data: Address) => {
        const res = await axios.put(`${API_BASE_URL}/addresses/${data.id}/`, data);
        setAddress(res.data);
        getAddress()
    };

    const deleteAddress = async (id: any) => {
        const payload = { deleted_by: "user" };
        if (id) {
            try {
                await axios.delete(`${API_BASE_URL}/addresses/${id}/`, {
                    data: payload, // Pass payload in the data field
                });
                getAddress()
            } catch (error) {
                console.error("Error deleting address:", error);
                // Optionally handle error (e.g., show a notification)
            }
        }
    };
    const userId = localStorage.getItem('user_id')
    useEffect(() => {
       
        if (userId) {
            getAddress();
        }
    }, [userId]);

    return (
        <AddressContext.Provider value={{ address, loading, getAddress, addAddress, updateAddress, deleteAddress }}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => {
    const context = useContext(AddressContext);
    if (!context) throw new Error("useAddress must be used within AddressProvider");
    return context;
};
