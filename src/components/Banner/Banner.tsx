import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Controller } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner1 from "../../assets/img/banner/heroBanner1.webp";
// import banner2 from "../../assets/img/banner/heroBanner2.webp";
// import banner3 from "../../assets/img/banner/heroBanner3.webp";
// import banner4 from "../../assets/img/banner/heroBanner1.webp";
import { useNavigate } from "react-router-dom";
interface SlideData {
    image: string;
    title: string;
    description: string;
}

const slides: SlideData[] = [
    { image: banner1, title: "Gaming PC Shop in Chennai", description: "Custom Gaming PC Built for Performance" },
    // { image: banner2, title: "Unleash the Power of Play!", description: "Valorant - Global Version" },
    // { image: banner3, title: "Step Into the Battle!", description: "Call of Duty - Next Gen" },
    // { image: banner4, title: "Experience the Thrill!", description: "FIFA 2025 - Ultimate Edition" },
];

function Banner() {
    const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null);
    const navigate =useNavigate()

    return (
        <>
          <section className="section-pt px-4 sm:px-12 lg:px-20 xl:px-40 3xl:px-60">
                <div className=" relative pt-[30px]">
                    {/* Main Swiper */}
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, Controller]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true} // ✅ Smooth looping
                        speed={900} // ✅ Increase transition speed for smooth effect
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false, // ✅ Ensures autoplay continues smoothly after interaction
                        }}
                        pagination={{ clickable: true }}
                        effect="slide" // ✅ Ensures slide effect
                        className="thumbs-gallery-main"
                        onSwiper={setMainSwiper}
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className="w-full rounded-32 overflow-hidden relative rounded-2xl">
                                    <img
                                        className="xxl:h-[630px] xl:h-[580px] lg:h-[520px] md:h-[420px] sm:h-[380px] h-[300px] object-cover"
                                        src={slide.image}
                                        alt="product"
                                    />
                                    <div className="absolute inset-0 z-[2] mx-80p 3xl:pt-[125px] xxl:pt-28 xl:pt-25 md:pt-12 pt-8">
                                        <div className="max-w-[790px]">
                                            <h1
                                                className="font-squares hidden md:block display-120 text-3xl md:text-7xl lg:text-8xl stroked-text-1 line-clamp-2 mb-2 "
                                                data-text={slide.title}
                                            >
                                                {slide.title}
                                            </h1>
                                            <h2
                                                className="font-squares md:hidden display-120 text-3xl md:text-6xl lg:text-7xl  line-clamp-2 mb-2 "
                                            >
                                                {slide.title}
                                            </h2>
                                            <div className="flex flex-wrap items-center gap-3 text-l-medium text-w-neutral-1 mb-40p">
                                                <span className="text-m-medium text-w-neutral-1">
                                                    {slide.description}
                                                </span>
                                            </div>
                                            <a onClick={()=>navigate('/allProducts')} className="btn btn-lg btn-primary rounded-12">
                                                Shop Now
                                            </a>
                                        </div>
                                    </div>
                                    <div className="overlay-1" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Thumbnail Swiper */}
                    {/* <div className="md:absolute lg:right-20 md:right-12 lg:bottom-15 md:bottom-12 z-[2] overflow-hidden pt-5 flex justify-end">
                        <Swiper modules={[Navigation]} slidesPerView={3} spaceBetween={10} loop={true} className="thumbs-gallery xxl:w-[572px] lg:w-[400px] md:w-[380px] xsm:w-[300px] w-full h-fit">
                            {slides.map((slide, index) => (
                                <SwiperSlide key={index} onClick={() => mainSwiper?.slideTo(index)}>
                                    <div className="overflow-hidden cursor-pointer rounded-20">
                                        <img
                                            className="xxl:w-[180px] xl:w-[140px] lg:w-[120px] w-32  xxl:h-[110px] xl:h-24 lg:h-20 md:h-18 h-16 hover:scale-110 hover:-rotate-6 object-cover transition-1"
                                            src={slide.image}
                                            alt="product"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div> */}
                </div>
            </section>
        </>
    );
}

export default Banner;
