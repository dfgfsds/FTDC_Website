import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAddress } from "../../context/AddressContext";
import axios from "axios";
import { useUsersContext } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";

function CheckoutSidebar({ isOpen, onClose, subtotal }: any) {

    const { userData } = useUsersContext()
    
    const { refetchCart } = useCart()
    const { address } = useAddress();
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [orderMessage, setOrderMessage] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(""); // or "cod"
    const [deliveryInfo, setDeliveryInfo] = useState<any>(null);

    const sidebarRef = useRef<HTMLDivElement>(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const RAZOR_PAY_KEY = import.meta.env.RAZOR_PAY_KEY;


    // Function to call the update-selected-address API
    const updateSelectedAddress = async (addressId: string) => {
        try {
            const userId = localStorage.getItem("user_id");
            if (!userId) throw new Error("User ID not found");
            await axios.patch(
                `${API_BASE_URL}/update-selected-address/user/${userId}/address/${addressId}/`,
                { updated_by: "user" }
            );
            setErrorMessage("");
        } catch (error) {
            console.error("Error updating selected address:", error);
            setErrorMessage("Failed to update selected address. Please try again.");
        }
    };

    const getDeliveryCharge = async () => {

        try {
            const userId = localStorage.getItem("user_id");
            if (!userId) throw new Error("User ID not found");
            // const payload = {
            //     user_id: parseInt(userId),
            //     vendor_id: 18,
            //     payment_mode: paymentMethod,
            //     customer_phone: userData?.contact_number,
            // }
            const res = await axios.get(`${API_BASE_URL}/vendor-site-payment-delivery-partner-details/18/`)
            setDeliveryInfo(res.data[0]);
            console.log(res?.data[0]?.own_delivery_charge, "delivery");

        } catch (error) {
            console.error("Error fetching delivery charge:", error);
        }
    }
    // Handle manual address selection
    useEffect(() => {
        if (selectedAddressId) {
            updateSelectedAddress(selectedAddressId);
        }
    }, [selectedAddressId]);
    useEffect(() => {
        getDeliveryCharge()
    }, [paymentMethod])

    const placeOrder = async () => {
        try {
            const userId = localStorage.getItem("user_id");
            if (!userId) throw new Error("User ID not found");
            if (!selectedAddressId) throw new Error("No address selected");

            const payload = {
                user_id: parseInt(userId),
                vendor_id: 18,
                customer_phone: userData?.contact_number,
            };

            if (paymentMethod === "cod") {
                // COD Flow
                const response = await axios.post(`${API_BASE_URL}/cod-pay-now/`, payload);
                console.log("COD Order placed:", response.data);
                setOrderMessage("Order placed with Cash on Delivery!");
                refetchCart()
                setErrorMessage("");
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                // Prepaid Flow
                const response = await axios.post(`${API_BASE_URL}/prepaid-pay-now/`, payload);
                const { payment_order_id, final_price } = response.data;

                const options = {
                    key: RAZOR_PAY_KEY,
                    amount: final_price * 100,
                    currency: "INR",
                    name: "FT digital computer",
                    description: "Order Payment",
                    order_id: payment_order_id,
                    handler: function (response: any) {
                        console.log("Payment Success:", response);
                        setOrderMessage("Payment successful and order placed!");
                        setTimeout(() => {
                            onClose();
                        }, 2000);
                    },
                    prefill: {
                        name: userData?.name,
                        email: userData?.email,
                        contact: userData?.contact_number,
                    },
                    notes: {
                        address: "Selected Address",
                    },
                    theme: {
                        color: "#ff340c",
                    },
                };

                const razor = new (window as any).Razorpay(options);
                razor.open();
                refetchCart()
                setErrorMessage("");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            setOrderMessage("Failed to place order. Please try again.");
            setErrorMessage("");
        }
    };



    // Auto-select and call API if only one address exists
    useEffect(() => {
        if (address?.length === 1 && !selectedAddressId) {
            const addressId = address[0].id.toString();
            setSelectedAddressId(addressId);
        } else if (address?.length > 0 && !selectedAddressId) {
            setSelectedAddressId(address[0].id.toString());
        }
    }, [address, selectedAddressId]);

    // Handle click outside to close sidebar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <section>
            <div
                ref={sidebarRef}
                className={`section-pt grow overflow-y-auto fixed top-0 right-0 h-full w-full sm:w-[500px] bg-black shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h3 className="text-xl font-bold font-squares text-white">Checkout</h3>
                    <button onClick={onClose} className="text-white" aria-label="Close sidebar">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className=" max-h-[calc(100vh-220px)] px-4 py-2 pr-2">
                    <div className="mb-6">
                        <h4 className="font-semibold mb-3 font-squares text-white text-lg">
                            Select Address
                        </h4>
                        {address?.length > 0 ? (
                            <div className="space-y-3">
                                {address.map((addr: any) => (
                                    <label
                                        key={addr.id}
                                        className="flex items-start gap-3 p-3 rounded-md bg-b-neutral-4 border border-gray-600 hover:border-orange-500 transition-colors cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="address"
                                            value={addr.id}
                                            checked={selectedAddressId === addr.id.toString()}
                                            onChange={(e) => setSelectedAddressId(e.target.value)}
                                            className="mt-1 h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-500 bg-black"
                                        />
                                        <div className="text-white">
                                            <p className="font-medium text-sm">{addr.address_type}</p>
                                            <p className="text-sm text-gray-300">
                                                {addr.address_line1}
                                                {addr.address_line2 && `, ${addr.address_line2}`}
                                            </p>
                                            <p className="text-sm text-gray-300">
                                                {addr.city}, {addr.state} {addr.postal_code}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm">No addresses available.</p>
                        )}
                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
                        )}
                        {orderMessage && (
                            <p
                                className={`text-sm mt-3 text-center ${orderMessage.includes("successfully")
                                    ? "text-green-500"
                                    : "text-red-500"
                                    }`}
                            >
                                {orderMessage}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2 font-medium text-sm font-squares">Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-2 rounded-md bg-black border border-gray-600 text-white"
                        >
                            <option value="">Prepaid</option>
                            <option value="cod">Cash on Delivery (COD)</option>
                        </select>
                    </div>



                </div>
                {deliveryInfo && (
                    <div className="bg-b-neutral-4 px-4  py-2 rounded-md text-white my-4">
                        {/* <p><strong>Courier:</strong> {deliveryInfo.courier?.courier_name}</p> */}
                        <p><strong>Delivery Charge:</strong> ₹{deliveryInfo?.own_delivery_charge}</p>
                        {/* <p><strong>Estimated Delivery:</strong> {deliveryInfo.courier?.etd} (in {deliveryInfo.courier?.etd_hours} hours)</p> */}
                        <p><strong>Total (Product ):</strong> ₹{subtotal}</p>
                    </div>
                )}

                {/* Footer */}
                <div className="p-4 border-t border-gray-700">
                    <div className="flex justify-between mb-4 text-2xl text-white">
                        <span>Total <span className="text-sm">(final price including delivery)</span>  </span>
                        <span>₹{Number(deliveryInfo?.own_delivery_charge) + Number(subtotal)}</span>
                    </div>
                    <button
                        className="btn btn-md btn-primary rounded-12 w-full disabled:bg-gray-500"
                        disabled={!selectedAddressId}
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CheckoutSidebar;