import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import "./product.css"
import { Activity, Star, StarHalf, StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";

// Skeleton loader for product cards
const ProductSkeleton = () => (
  <div className="bg-b-neutral-3 rounded-24 w-full h-full p-4 animate-pulse">
    <div className="w-full h-[250px] bg-neutral-700 rounded-md mb-4" />
    <div className="h-6 bg-neutral-700 rounded w-3/4 mb-3" />
    <div className="h-4 bg-neutral-700 rounded w-1/2 mb-2" />
    <div className="h-4 bg-neutral-700 rounded w-2/3 mb-3" />
    <div className="h-6 bg-neutral-700 rounded w-1/2 mb-2" />
    <div className="h-10 bg-neutral-700 rounded w-full" />
  </div>
);

const Products: React.FC = () => {
  const navigate = useNavigate();
  const { products, isLoading, isError } = useProductContext();
  const { addToCart, increaseQuantity, decreaseQuantity, cartItems } = useCart()

  function slugConvert(name: string) {
    return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  }



  return (
    <section className="section-pt px-8 md:px-32">
      <div className="">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="heading-2 text-2xl md:text-4xl font-squares text-split-left">
            Our Products
          </h2>
          <h2
            className="font-squares cursor-pointer text-md md:text-xl mt-2 md:mt-0 self-end md:self-auto"
            onClick={() => navigate("/allProducts")}
          >
            View All
          </h2>
        </div>

        <div className="mt-40p">
          {isError ? (
            <div className="text-center text-red-500 font-medium text-xl py-10">
              Something went wrong while fetching products. Please try again later.
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Scrollbar]}
              spaceBetween={20}
              slidesPerView={4}
              scrollbar={{ draggable: true }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1480: { slidesPerView: 4 },
              }}
            >
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                  <SwiperSlide key={index}>
                    <ProductSkeleton />
                  </SwiperSlide>
                ))
                : products?.map((product: any) => (

                  <SwiperSlide key={product.id}>
                    <div className="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full h-full">
                      {/* Product Image */}
                      <div className="relative w-full h-[250px] overflow-hidden">
                        <div className="glitch-effect">
                          <div className="glitch-thumb first">
                            <img
                              className="w-full h-full object-cover"
                              src={product.image_urls[0]}
                              alt={product.name}
                            />
                          </div>
                          <div className="glitch-thumb second">
                            <img
                              className="w-full h-full object-cover"
                              src={product.image_urls[0]}
                              alt={product.name}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 text-center">
                        <div
                          onClick={() => navigate(`/singleProduct/${slugConvert(product?.name)}`, { state: product })}
                          className="text-left line-clamp-1 block text-xl md:text-3xl mt-4 p-1 font-squares cursor-pointer text-primary hover:underline"
                        >
                          {product.name}
                        </div>

                        {/* Rating & Status */}
                        <div className="flex items-center justify-between text-w-neutral-1 my-3">
                          <div className="flex items-center text-primary">
                            {Array.from({ length: 5 }).map((_, index) => {
                              const rating = product.rating ?? 4;
                              return (
                                <span key={index}>
                                  {index < Math.floor(rating) ? (
                                    <StarIcon size={20} fill="yellow" stroke="yellow" />
                                  ) : index < rating ? (
                                    <StarHalf size={20} fill="yellow" stroke="yellow" />
                                  ) : (
                                    <Star size={20} className="text-w-neutral-4" />
                                  )}
                                </span>
                              );
                            })}
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <span className="span text-s-medium">Online</span>
                            <Activity size={20} className="text-w-neutral-4" />
                          </div>
                        </div>

                        {/* Price */}
                        <span className="text-m-medium text-w-neutral-1 text-md md:text-xl block mb-2 text-xl text-left p-2">
                          Price: ₹ {product.price}/-
                        </span>

                        {/* ✅ Add to Cart */}

                        {(() => {
                          const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
                          const cartItem = isLoggedIn
                            ? cartItems?.cart_items?.find((item: any) => item.product === product.id)
                            : null;

                          if (cartItem) {
                            return (
                              <div className="flex items-center justify-between border rounded-full px-2 py-1">
                                <button
                                  onClick={() => decreaseQuantity(product.id)}
                                  className="btn btn-xs btn-primary px-3"
                                >
                                  -
                                </button>
                                <span className="text-base font-medium">{cartItem.quantity}</span>
                                <button
                                  onClick={() =>
                                    increaseQuantity({
                                      product_id: product.id,
                                      quantity: Number(product?.productQuantity) + 1,
                                    })}
                                  className="btn btn-xs btn-primary  px-3"
                                >
                                  +
                                </button>
                              </div>
                            );
                          } else {
                            return (
                              <button
                                onClick={() => {
                                  if (isLoggedIn) {
                                    addToCart({ product_id: product.id, quantity: 1 });
                                  } else {
                                    navigate("/login");
                                  }
                                }}
                                className="btn btn-sm btn-primary w-full mx-auto flex text-sm md:text-md btn-neutral-2 justify-center"
                              >
                                Add to Cart
                              </button>
                            );
                          }
                        })()}
                      </div>
                    </div>
                  </SwiperSlide>

                ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
