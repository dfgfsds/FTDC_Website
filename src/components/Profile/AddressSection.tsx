import { useAddress } from "../../context/AddressContext";
import { useState, useEffect } from "react";

// Define the Form type explicitly
interface Form {
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
    [key: string]: string | number; // Index signature for dynamic access
}

const defaultForm: Form = {
    user: Number(localStorage.getItem("user_id") || "0"),
    email_address: "",
    customer_name: "",
    address_type: "Home",
    contact_number: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    landmark: "",
};

function AddressSection() {
    const { address, loading, addAddress, updateAddress, deleteAddress } = useAddress();

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [form, setForm] = useState<Form>({ ...defaultForm });

    useEffect(() => {
        if (!isEditing) {
            setForm({ ...defaultForm });
            setEditingId(null);
        }
    }, [isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "user" ? Number(value) || 0 : value, // Handle number for user
        }));
    };

    const handleSubmit = () => {
        if (editingId !== null) {
            updateAddress({
                ...form,
                id: editingId,
                updated_by: "user",
            });
        } else {
            const payload = { ...form, created_by: "user" };
            console.log(payload);
            addAddress(payload);
        }
        setIsEditing(false);
    };

    const handleEdit = (addr: any) => {
        const editableForm = Object.keys(defaultForm).reduce((acc, key) => {
            acc[key] = addr[key] ?? defaultForm[key as keyof Form];
            return acc;
        }, {} as Form);
        setForm(editableForm);
        setEditingId(addr.id);
        setIsEditing(true);
    };

    const handleDelete = (id: any) => {
        console.log(id, "delete id");
        deleteAddress(id);
    };

    return (
        <div className="bg-b-neutral-3 p-6 rounded-md mt-10">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white font-squares">Address</h3>
                {!isEditing && (
                    <button
                        className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition"
                        onClick={() => {
                            setForm({ ...defaultForm });
                            setEditingId(null);
                            setIsEditing(true);
                        }}
                    >
                        Add Address
                    </button>
                )}
            </div>

            {loading ? (
                <p className="text-gray-400">Loading...</p>
            ) : isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.keys(defaultForm).map(
                        (key) =>
                            key !== "user" && (
                                <div key={key} className="flex flex-col">
                                    <label htmlFor={key} className="text-sm text-white mb-1 flex">
                                        {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name={key}
                                        id={key}
                                        value={String(form[key] ?? "")} // Convert to string for input
                                        onChange={(e) => {
                                            handleChange(e);
                                            setFormErrors((prev) => ({ ...prev, [key]: "" }));
                                        }}
                                        placeholder={key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                        className={`border px-4 py-2 rounded bg-transparent text-white w-full ${formErrors[key] ? "border-red-500" : "border-gray-500"
                                            }`}
                                    />
                                    {formErrors[key] && (
                                        <span className="text-red-500 text-sm mt-1">{formErrors[key]}</span>
                                    )}
                                </div>
                            )
                    )}

                    <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
                        <button
                            className="bg-primary text-white py-2 px-6 rounded hover:bg-primary-dark transition"
                            onClick={(e) => {
                                e.preventDefault();
                                const errors: { [key: string]: string } = {};

                                Object.entries(form).forEach(([key, value]) => {
                                    if (key !== "user") {
                                        if (typeof value === "string" && !value.trim()) {
                                            errors[key] = `${key
                                                .replace(/_/g, " ")
                                                .replace(/\b\w/g, (l) => l.toUpperCase())} is required`;
                                        } else if (typeof value === "number" && (isNaN(value) || value === 0)) {
                                            errors[key] = `${key
                                                .replace(/_/g, " ")
                                                .replace(/\b\w/g, (l) => l.toUpperCase())} is required`;
                                        }
                                    }
                                });

                                if (Object.keys(errors).length > 0) {
                                    setFormErrors(errors);
                                } else {
                                    handleSubmit();
                                }
                            }}
                        >
                            Save
                        </button>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : address.length > 0 ? (
                <div className="space-y-6">
                    {address.map((addr: any, i: number) => (
                        <div
                            key={addr.id}
                            className="border border-gray-700 bg-gray-800 p-6 rounded-lg text-white shadow-md"
                        >
                            <h3 className="text-lg font-semibold mb-3 border-b border-gray-600 pb-1">
                                📍 Address : {i + 1}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                <p>Name: {addr?.customer_name || "N/A"}</p>
                                <p>Email: {addr?.email_address || "N/A"}</p>
                                <p>Contact Number: {addr?.contact_number || "N/A"}</p>
                                <p>Address Type: {addr?.address_type || "N/A"}</p>
                                <p>Address Line 1: {addr?.address_line1 || "N/A"}</p>
                                <p>Address Line 2: {addr?.address_line2 || "N/A"}</p>
                                <p>Landmark: {addr?.landmark || "N/A"}</p>
                                <p>City: {addr?.city || "N/A"}</p>
                                <p>State: {addr?.state || "N/A"}</p>
                                <p>Country: {addr?.country || "N/A"}</p>
                                <p>Postal Code: {addr?.postal_code || "N/A"}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                                    onClick={() => handleEdit(addr)}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition"
                                    onClick={() => handleDelete(addr?.id)}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No address found. Please add your address.</p>
            )}
        </div>
    );
}

export default AddressSection;