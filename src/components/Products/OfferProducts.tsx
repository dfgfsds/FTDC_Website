import { useEffect, useState } from "react";

const OfferProducts = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const product = {
        name: "LCD Monitor - Philips V Line",
        images: [
            "https://images.philips.com/is/image/philipsconsumer/2d8237082fdf48d9b716b019010ce543?wid=1400&hei=1400&$pnglarge$",
            "https://images.philips.com/is/image/philipsconsumer/57d4db341698424ea257b012012b0471?$pnglarge$&wid=1400&hei=1400",
            "https://images.philips.com/is/image/philipsconsumer/43ac8f4fea884b15bdd1b015008d4576?$pnglarge$&wid=1400&hei=1400",
            "https://images.philips.com/is/image/philipsconsumer/9ee589ff59ad4686be33b01a00fc0354?$pnglarge$&wid=1920",
        ],
        description: "Philips V line wide-view monitor gives viewing beyond boundaries. Adaptive-Sync, LowBlue mode, flicker-free screen & more. Ideal for work and gaming!",
        originalPrice: 180000,
        offerPrice: 149999,
        highlights: [
            "23.8-inch Full HD Display",
            "Ultra Narrow Bezel",
            "LowBlue Mode for Eye Comfort",
            "Flicker-Free Technology",
            "3-Year Warranty",
        ],
    };

    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <section className="section-pt px-2 md:px-32">
            <div className="  bg-black text-white px-6 py-12 space-y-10">
                {/* 🔥 Headline */}
                <h1 className="text-4xl font-bold text-center font-squares text-primary">
                    🔥 Hot Deal: {product.name}
                </h1>

                <div className="flex flex-col md:flex-row gap-8 mt-6">
                    {/* Left Section - Image Gallery */}
                    <div className="flex-1 relative">
                        {/* Offer Badge */}
                        <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-6 py-2 rounded-full z-10">
                            25% OFF
                        </span>

                        <div className="border-2 rounded-lg overflow-hidden">
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-full h-96 object-cover"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex mt-4 gap-2 overflow-x-auto">
                            {product.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Thumbnail ${idx}`}
                                    onClick={() => setSelectedImage(img)}
                                    className={`h-20 w-20 object-cover rounded cursor-pointer border-2 ${selectedImage === img ? "border-primary" : "border-gray-700"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Section - Product Details */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-2xl font-semibold font-squares">{product.name}</h2>

                        <p className="text-gray-300">{product.description}</p>

                        {/* Price Section */}
                        <div>
                            <p className="text-gray-400 line-through text-lg">₹{product.originalPrice}/-</p>
                            <p className="text-primary font-bold text-3xl">₹{product.offerPrice}/-</p>
                            <p className="text-sm text-primary mt-1">Limited Time Offer! Hurry Up ⏳</p>
                        </div>

                        {/* Countdown (static demo) */}
                        <div className="bg-gray-900 border border-primary p-3 rounded text-center">
                            <p className="text-sm">⚡ Offer ends in: <span className="text-primary font-bold">02:15:30</span></p>
                        </div>

                        {/* Highlights */}
                        <ul className="list-disc pl-5 space-y-1 text-gray-400 text-sm leading-snug grid grid-cols-2 gap-x-6">
                            {product.highlights.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </ul>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-4 mt-4 text-[12px] text-gray-400">
                            <span className="bg-gray-800 px-4 py-2 rounded-full">🚚 Free Delivery</span>
                            <span className="bg-gray-800 px-4 py-2 rounded-full">🔒 Secure Checkout</span>
                            <span className="bg-gray-800 px-4 py-2 rounded-full">🛡️ 3-Year Warranty</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button className="bg-primary hover:bg-primary-600 transition-all text-white font-bold py-3 px-6 rounded w-full">
                                Add to Cart
                            </button>
                            <button className="bg-white text-black font-bold py-3 px-6 rounded w-full hover:bg-gray-200 transition">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfferProducts;
