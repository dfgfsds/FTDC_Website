import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import cat1 from "../../assets/img/cat/catImg1.jpg";
import cat2 from "../../assets/img/cat/catImg2.jpg";
import cat3 from "../../assets/img/cat/catImg3.jpg";
import cat4 from "../../assets/img/cat/catImg4.jpg";
import cat5 from "../../assets/img/cat/catImg5.jpg";
import cat6 from "../../assets/img/cat/catImg6.jpg";
import { useCategoryContext } from "../../context/CategotyContext";
import { useNavigate } from "react-router-dom";

const categoryImages = [cat1, cat2, cat3, cat4, cat5, cat6];

const Categories: React.FC = () => {
    const { category } = useCategoryContext(); // this is your dynamic category list
    const navigate = useNavigate()

    return (
        <section className="section-pt px-8 md:px-32 mt-10 z-40">
            <div className="relative pt-[30px]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h2 className="heading-2 text-2xl md:text-4xl text-split-left font-squares mb-2">Our Categories</h2>
                    <h2
                        className="font-squares cursor-pointer text-md md:text-xl mt-2 mb-2 md:mt-0 self-end md:self-auto"
                        onClick={() => navigate("/allCategories")}
                    >
                        View All
                    </h2>
                </div>
                <Swiper
                    modules={[Navigation, Scrollbar, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 3000 }}
                    scrollbar={{ draggable: true }}
                    className="two-card-carousel"
                >
                    {category?.map((cat: any, index: number) => (
                        <SwiperSlide key={cat.id}>
                            <div className="w-full bg-b-neutral-3 grid grid-cols-1 4xl:grid-cols-2 items-center rounded-24 overflow-hidden group">
                                <div className="overflow-hidden h-full">
                                    <img
                                        className="w-full 4xl:h-full 3xl:h-[340px] xl:h-[320px] sm:h-[280px] h-[200px] object-cover object-top group-hover:scale-110 transition-1"
                                        src={categoryImages[index % categoryImages.length]}
                                        alt={cat.name}
                                    />
                                </div>
                                <div className="p-2 md:p-6">
                                    <a onClick={() =>
                                        navigate(`/allProducts?category=${cat.id}`, {
                                            state: { categoryName: cat.name.endsWith("FTDC") ? cat.name.replace(/ FTDC$/, "") : cat.name }
                                        })}
                                        className="heading-3 text-xl md:text-3xl link-1 line-clamp-1 mb-4 font-squares text-center cursor-pointer ">
                                        {cat.name.endsWith("FTDC") ? cat.name.replace(/ FTDC$/, "") : cat.name}
                                    </a>
                                    <a onClick={() =>
                                        navigate(`/allProducts?category=${cat.id}`, {
                                            state: { categoryName: cat.name.endsWith("FTDC") ? cat.name.replace(/ FTDC$/, "") : cat.name }
                                        })
                                    } className="btn btn-sm btn-primary flex btn-neutral-2 w-full">
                                        View Products
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Categories;
