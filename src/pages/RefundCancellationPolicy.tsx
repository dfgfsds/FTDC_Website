import { useEffect } from "react";

const RefundCancellationPolicy = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-black text-white px-6 py-10 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-squares text-primary mt-20">Refund & Cancellation Policy</h1>

            <p>
                At FT Digitech, we prioritize customer satisfaction. Please read our Refund & Cancellation Policy carefully before making a purchase.
            </p>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Order Cancellation</h2>
                <p>
                    Orders can only be cancelled within 24 hours of placing them, provided the item hasn’t been shipped yet. Once shipped, cancellations are not accepted.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Refund Policy</h2>
                <p>
                    Refunds are only applicable if:
                </p>
                <ul className="list-disc list-inside space-y-1">
                    <li>The item you received is defective or damaged</li>
                    <li>The item delivered is different from what was ordered</li>
                    <li>The item is out of stock and cannot be delivered</li>
                </ul>
                <p>
                    Refunds will be processed within 7-10 business days to the original payment method.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Return Conditions</h2>
                <p>
                    Items must be returned in their original packaging, unused, and with all tags attached. We reserve the right to reject returns that do not meet these conditions.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Non-Refundable Items</h2>
                <p>
                    Certain items may not be eligible for refund, such as:
                </p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Items purchased during sales or promotional offers</li>
                    <li>Customized or special-order items</li>
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">How to Request a Refund or Cancellation</h2>
                <p>
                    Please contact us at <span className="underline">info@ftdigitalcomputer.in</span> with your order ID and reason for the request. We will review and respond within 1–2 business days.
                </p>
            </div>
        </div>
    );
};

export default RefundCancellationPolicy;
