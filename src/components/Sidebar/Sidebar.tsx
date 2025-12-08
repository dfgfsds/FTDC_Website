import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import cat1 from "../../assets/img/cat/catImg1.jpg";
import cat2 from "../../assets/img/cat/catImg2.jpg";
import cat3 from "../../assets/img/cat/catImg3.jpg";
import cat4 from "../../assets/img/cat/catImg4.jpg";
import cat5 from "../../assets/img/cat/catImg5.jpg";
import cat6 from "../../assets/img/cat/catImg6.jpg";
import { useNavigate } from "react-router-dom";
import { useCategoryContext } from "../../context/CategotyContext";

const categoryImages = [cat1, cat2, cat3, cat4, cat5, cat6];

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const { category } = useCategoryContext();
    return (
        <>
            {/* Left Sidebar */}
            <div>
                <div className="fixed hidden md:block top-0 left-0 lg:translate-x-0 -translate-x-full h-screen z-30 bg-b-neutral-4 pt-30 px-[15px] transition-1">
                    <div className="max-h-screen overflow-y-auto scrollbar-0">
                        <div className="flex flex-col items-center xxl:gap-[30px] xl:gap-6 lg:gap-5 gap-4 h-[700px] side-navbar-one">
                            <button onClick={() => navigate('/allCategories')} className="nav-toggole btn-c btn-c-3xl btn-primary icon-32 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layout-grid">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                    <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                    <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                    <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                </svg>
                            </button>
                            <div className="flex flex-col gap-2 rounded-full bg-b-neutral-1 w-fit p-2 shrink-0">
                                <a onClick={() => navigate('/allProducts')} className="nav-item btn-c btn-c-3xl text-white  transition-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-flame">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 10.941c2.333 -3.308 .167 -7.823 -1 -8.941c0 3.395 -2.235 5.299 -3.667 6.706c-1.43 1.408 -2.333 3.621 -2.333 5.588c0 3.704 3.134 6.706 7 6.706s7 -3.002 7 -6.706c0 -1.712 -1.232 -4.403 -2.333 -5.588c-2.084 3.353 -3.257 3.353 -4.667 2.235" />
                                    </svg>
                                </a>
                                <a onClick={() => navigate('/profile')} className="nav-item btn-c btn-c-3xl text-white  transition-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users-group">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                        <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                                        <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                        <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                                        <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                        <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                                    </svg>
                                </a>
                                <a onClick={() => navigate('/cart')} className="nav-item btn-c btn-c-3xl text-white  transition-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bookmark">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" />
                                    </svg>
                                </a>
                                <a onClick={() => navigate('/')} className="nav-item btn-c btn-c-3xl text-white  transition-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                    </svg>
                                </a>
                            </div>
                            <div className="flex flex-col gap-2 rounded-full w-fit p-2 shrink-0">
                                <a onClick={() => navigate('/')} className="nav-item btn-c btn-c-3xl ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-diamond">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M6 5h12l3 5l-8.5 9.5a.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5" />
                                        <path d="M10 12l-2 -2.2l.6 -1" />
                                    </svg>
                                </a>
                                <a onClick={() => navigate('/')} className="nav-item btn-c btn-c-3xl ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-messages">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                        <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                                    </svg>
                                </a>
                                <a onClick={() => navigate('/profile')} className="nav-item btn-c btn-c-3xl ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="fixed hidden md:block top-0 right-0 lg:translate-x-0 translate-x-full h-screen z-30 bg-b-neutral-4 pt-30 px-[10px] transition-1">
                <div className="flex flex-col items-center xxl:gap-[30px] xl:gap-6 lg:gap-5 gap-4">
                    <div className="flex flex-col items-center gap-16p rounded-full w-fit p-2">
                        <Swiper
                            direction="vertical"
                            slidesPerView={5}
                            spaceBetween={10}
                            loop={true}
                            autoplay={{ delay: 2000, disableOnInteraction: false }}
                            className="max-h-[540px] w-full"
                            modules={[Autoplay]}
                        >

                            {category?.map((cat: any, index: number) => (
                                <SwiperSlide key={index} className="flex flex-col items-center w-24 text-center">
                                    <div
                                        onClick={() =>
                                            navigate(`/allProducts?category=${cat.id}`, {
                                                state: {
                                                    categoryName: cat.name.endsWith("FTDC")
                                                        ? cat.name.replace(/ FTDC$/, "")
                                                        : cat.name,
                                                },
                                            })
                                        }
                                        className="cursor-pointer flex flex-col items-center gap-2"
                                    >
                                        <div className="avatar w-16 h-16">
                                            <img
                                                src={categoryImages[index % categoryImages.length]}
                                                alt={`avatar-${index}`}
                                                className="rounded-full w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="text-xs text-white leading-tight break-words max-w-[90px]">
                                            {cat.name.endsWith("FTDC")
                                                ? cat.name.replace(/ FTDC$/, "")
                                                : cat.name}
                                        </span>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="w-full h-1px bg-b-neutral-1" />
                </div>
            </div>
        </>
    );
};

export default Sidebar;
