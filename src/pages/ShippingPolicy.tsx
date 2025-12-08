import { useEffect } from "react";

const ShippingPolicy = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-black text-white px-6 py-10 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-squares text-primary mt-20">Shipping Policy</h1>

            <p>
                We are committed to delivering your order in a timely and secure manner. Please review our shipping policy to understand how we handle orders and deliveries.
            </p>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Delivery Locations</h2>
                <p>
                    We currently ship all over India to serviceable pin codes using trusted courier partners like DTDC Surface.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Shipping Time</h2>
                <p>
                    Orders are processed within 24–48 hours. Delivery usually takes 3–7 business days depending on your location. Some remote areas may experience longer shipping times.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Shipping Charges</h2>
                <p>
                    Shipping charges are calculated based on the weight, dimensions, and destination of your order. The total cost will be displayed at checkout.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Tracking Your Order</h2>
                <p>
                    Once your order is shipped, you will receive an email or SMS with a tracking link so you can follow your shipment’s journey.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Shipping Delays</h2>
                <p>
                    While we strive for timely deliveries, occasional delays due to weather, transportation issues, or regional lockdowns may occur.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Need Help?</h2>
                <p>
                    For any shipping-related queries, feel free to reach out to us at <span className="underline">info@ftdigitalcomputer.in</span>.
                </p>
            </div>
        </div>
    );
};

export default ShippingPolicy;
