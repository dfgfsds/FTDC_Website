

import { useState } from "react";

export default function HomeSeoSection() {
    const [open, setOpen] = useState(false);

    return (
        <section className=" px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-5xl mx-auto  text-gray-50">

                {/* TITLE */}
                <h2 className="text-3xl sm:text-4xl text-center font-bold text-gray-50 mb-4">
                    What We Do
                </h2>

                {/* ALWAYS VISIBLE CONTENT (SEO SAFE) */}
                <p className="text-gray-50 text-lg text-center leading-relaxed">
                    At our gaming PC shop in Chennai, we focus on one thing—building gaming systems that deliver real-world performance, not just flashy specs.
                </p>

                {/* COLLAPSIBLE CONTENT */}
                <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${open ? "max-h-[5000px] mt-6" : "max-h-0"
                        }`}
                >
                    <div className="space-y-6 text-gray-50 text-lg leading-relaxed">

                        {/* BRAND NEW */}
                        <h3 className="text-2xl font-bold text-gray-50">
                            Custom Gaming PC Builds
                        </h3>
                        <p>
                            We design custom PC builds based on your gaming needs, budget, and future upgrade plans. Whether you play competitive FPS games, open-world AAA titles, or do streaming alongside gaming, we select the right gaming PC processor, GPU, RAM, and storage combination for optimal performance.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-50">
                            PC Building & Assembly
                        </h3>
                        <p>
                            As a dedicated PC building shop, we handle everything—from component selection to professional assembly, BIOS configuration, stress testing, and cable management. Every PC is tested for stability before delivery.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-50">
                            PC Components & Parts
                        </h3>
                        <p>
                            We are also a reliable PC parts store, offering genuine processors, motherboards, RAM, SSDs, power supplies, cabinets, cooling solutions, and graphics cards for PC gaming. We guide customers to choose compatible and value-for-money components.
                        </p>
                        <h3 className="text-2xl font-bold text-gray-50">
                            Gaming Upgrades & Support
                        </h3>
                        <p>
                            Already have a PC? We help with upgrades, GPU replacements, storage expansion, and cooling improvements. Our goal is to make your system faster, cooler, and future-ready.


                        </p>



                        {/* GAMING */}
                        <h3 className="text-2xl font-bold text-gray-50">
                            Why a Custom Gaming PC Matters
                        </h3>
                        <p>A custom-built gaming PC gives you</p>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>Better performance per rupee</li>
                            <li>Higher-quality gaming PC processors</li>
                            <li>Proper cooling and airflow</li>
                            <li>Upgrade flexibility</li>
                            <li>Longer system lifespan</li>
                        </ul>
                        <p>
                            At our gaming PC shop in Chennai, we focus on building systems that grow with you—so you don’t need a full replacement every few years.
                        </p>

                        {/* CUSTOM PC */}
                        <h1 className="text-2xl font-bold text-gray-50">
                            Gaming PC Shop in Chennai – Custom Gaming PCs Built for Performance
                        </h1>
                        <p>Choosing the right gaming computer store makes a huge difference in performance, lifespan, and peace of mind. Here’s why gamers trust us:</p>
                        <h4 className="text-xl font-bold text-gray-50">
                            Expert Configuration, Not Guesswork
                        </h4>
                        <p>We don’t push unnecessary parts. Every build is performance-balanced, ensuring your CPU and GPU work efficiently together without bottlenecks.</p>

                        <h4 className="text-xl font-bold text-gray-50">
                            Genuine Components Only
                        </h4>
                        <p>All PC components used in our builds are original and sourced from trusted distributors. No refurbished or low-quality parts unless clearly requested.</p>
                        <h4 className="text-xl font-bold text-gray-50">
                            Transparent Pricing
                        </h4>
                        <p>No hidden charges. You’ll know exactly what you’re paying for—component-wise. We help you get the best value within your budget.</p>
                        <h4 className="text-xl font-bold text-gray-50">
                            Built for Indian Gaming Conditions
                        </h4>
                        <p>From proper airflow to reliable power supplies, our systems are designed to perform well in Indian temperature and voltage conditions.</p>
                        <h4 className="text-xl font-bold text-gray-50">
                            Local Support in Chennai
                        </h4>
                        <p>As a local gaming PC shop in Chennai, you get faster service, easy upgrades, and real human support whenever you need help.</p>

                        <h2 className="text-2xl font-bold text-gray-50">
                            Trusted by Gamers & Professionals
                        </h2>
                        <p>Over the years, gamers, streamers, designers, and tech enthusiasts have trusted us as their go-to gaming computer store. Our reputation is built on honest advice, quality builds, and long-term customer relationships.</p>



                        <h2 className="text-2xl font-bold text-gray-50">
                            Your Local Gaming PC Shop in Chennai
                        </h2>
                        <p>If you’re searching for a reliable gaming PC shop in Chennai that understands gaming performance, component compatibility, and future upgrades, we’re here to help. From expert-built custom systems to genuine PC parts and upgrades, we make gaming PCs the right way.</p>



                        <p className="font-semibold text-gray-50">
                            Visit our store or get in touch to build your next gaming machine with confidence.
                        </p>
                    </div>
                </div>

                {/* READ MORE BUTTON */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setOpen(!open)}
                        className="px-6 py-3 bg-[#ff340c] text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
                    >
                        {open ? "Read Less" : "Read More"}
                    </button>
                </div>

            </div>
        </section>
    );
}
