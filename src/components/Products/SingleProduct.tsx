import { ChevronsRight, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bgImage from "../../assets/img/breadcrumbImg.png";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { useCart } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext";

function SingleProduct() {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const location = useLocation();
    const { products, isLoading } = useProductContext()
    const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const navigate = useNavigate()

    function slugConvert(name: string) {
        return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    }


    const pathname = location.pathname; // "/singleProduct/acer-aspire-3"

    // Split by "/" and get the last segment
    const lastSegment = pathname.substring(pathname.lastIndexOf("/") + 1);
    const product = products?.find(
        (p: any) => slugConvert(p.name) === lastSegment
    );



    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const isInCart = cartItems?.cart_items?.some((item: any) => item.product === product?.id)
    const matchedCartItem = cartItems?.cart_items?.find((item: any) => item.product === product?.id);
    const currentQuantity = matchedCartItem?.quantity || 1;
    // ✅ Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
            </div>
        );
    }
    // ✅ If product not found
    if (!product) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <p className="text-lg text-gray-500">Product not found</p>
            </div>
        );
    }

    return (
        <div className="px-8 md:px-32">
            {/* Breadcrumb */}
            <section className="pt-30p">
                <div className="relative bg-cover bg-no-repeat rounded-24 overflow-hidden" style={{ backgroundImage: `url(${bgImage})` }}>
                    <div className="container">
                        <div className="grid grid-cols-12 gap-30p relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]">
                            <div className="lg:col-start-2 lg:col-end-12 col-span-12">
                                <h2 className="heading-2 text-w-neutral-1 mb-3 font-squares text-3xl">Shop Details</h2>
                                <ul className="breadcrumb flex items-center gap-2">
                                    <li className="breadcrumb-item">
                                        <Link to="/" className="breadcrumb-link text-inherit hover:underline">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <ChevronsRight className="w-4 h-4" />
                                    </li>
                                    <li className="breadcrumb-item">
                                        <span className="text-w-neutral-1">Shop Details</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="overlay-11 absolute inset-0 bg-black/40 z-[1]" />
                </div>
            </section>

            {/* Product Section */}
            <section className="py-15 overflow-visible">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-30p gap-y-10 mb-60p">
                        {/* Product Images */}
                        <div className="xxl:col-span-6 xl:col-span-7 col-span-12 relative">
                            <div className="xl:sticky xl:top-30">
                                <div className="flex md:gap-[30px] gap-2.5 xl:h-[514px] sm:h-[400px] h-[300px]">

                                    <div className="shrink-0 sm:w-[110px] w-20">
                                        <Swiper
                                            onSwiper={setThumbsSwiper}
                                            direction="vertical"
                                            spaceBetween={10}
                                            slidesPerView={4}
                                            freeMode
                                            watchSlidesProgress
                                            modules={[Thumbs, FreeMode]}
                                            className="h-full"
                                        >
                                            {product?.image_urls.map((src: any, index: number) => (
                                                <SwiperSlide key={index}>
                                                    <div className="cursor-pointer flex-c bg-b-neutral-3 rounded-12">
                                                        <img
                                                            className="w-full sm:h-[114px] h-24 object-contain"
                                                            src={src}
                                                            alt={`Thumb ${index + 1}`}
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>

                                    <Swiper
                                        spaceBetween={10}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        modules={[Thumbs]}
                                        className="thumbs-gallery-main w-full"
                                    >
                                        {product?.image_urls?.map((src: any, index: number) => (
                                            <SwiperSlide key={index}>
                                                <div className="w-full h-full flex-c bg-b-neutral-3 p-[32px] rounded-12 overflow-hidden">
                                                    <img
                                                        className="md:size-[356px] sm:size-[300px] size-[280px] object-contain"
                                                        src={src}
                                                        alt={`Product ${index + 1}`}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="xxl:col-span-6 xl:col-span-5 col-span-12">
                            <div>
                                <h2 className="heading-3 text-w-neutral-1 mb-16p font-squares text-md line-clamp-2">{product?.name}</h2>
                                <div className="flex-y gap-1 mb-20p">
                                    <span className="text-xl text-w-neutral-4 line-through">₹{product?.price}</span>
                                    <span className="text-lead-medium text-w-neutral-1">₹{product?.price}</span>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: product?.description }} className="text-base text-w-neutral-4 mb-3" />
                                {/* <p className="text-base text-w-neutral-4">{product.subDescription}</p> */}

                                <div className="flex items-center flex-wrap gap-3 my-32p">
                                    {isInCart || isAdded ? (
                                        <div className="flex-c">
                                            <div className="qtySelector inline-flex items-center justify-center border border-shap px-16p sm:py-3 py-2 rounded-12 w-[144px] *:h-full">
                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity({
                                                            product_id: product.id,
                                                        })
                                                    }
                                                    className="decreaseQty flex-c size-12 icon-24"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <input
                                                    min={1}
                                                    value={currentQuantity}
                                                    type="number"
                                                    className="qtyValue btn-xsm bg-transparent min-w-12 max-w-18 text-base text-w-neutral-1 text-center"
                                                    readOnly
                                                />
                                                <button
                                                    onClick={() =>
                                                        increaseQuantity({
                                                            product_id: product.id,
                                                            quantity: Number(product?.productQuantity) + 1,
                                                        })
                                                    }
                                                    className="increaseQty flex-c size-12 icon-24"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <a onClick={() => {
                                            const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
                                            if (isLoggedIn) {
                                                addToCart({ product_id: product.id, quantity: 1 });
                                                setIsAdded(true); // Update local UI state
                                            } else {
                                                navigate("/login");
                                            }
                                        }} className="btn btn-lg-2 btn-primary rounded-12">
                                            <ShoppingCart /> Buy Now
                                        </a>
                                    )}
                                    <a href="/" className="btn py-3 px-16p btn-primary rounded-12 icon-28">
                                        <Heart />
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    );
}

export default SingleProduct;
