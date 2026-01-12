import { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Banner from '../components/Banner/Banner'
import Categories from '../components/Categories/Categories'
import Products from '../components/Products/Products'


interface Props { }

function Home(props: Props) {
    const { } = props
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>

            <Helmet>
                {/* Meta Title */}
                <title>Gaming PC Shop in Chennai | Custom PC Builds & Components | FTDC</title>

                {/* Meta Description */}
                <meta
                    name="description"
                    content="Buy high-performance custom gaming PCs from a trusted gaming PC shop in Chennai. Genuine components, expert builds & local support"
                />

                {/* Canonical */}
                <link rel="canonical" href="https://www.ftdigitalcomputer.in/" />

                {/* Robots */}
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Gaming PC Shop in Chennai | Custom PC Builds & Components | FTDC" />
                <meta property="og:description" content="Trusted gaming PC shop in Chennai offering custom gaming PC builds, genuine components, and expert local support." />
                <meta property="og:url" content="https://www.ftdigitalcomputer.in/" />
                <meta property="og:site_name" content="FTDigitalComputer" />
                <meta property="og:locale" content="en_IN" />
                <meta property="og:image" content="https://www.ftdigitalcomputer.in/assets/img/banner/heroBanner1.webp" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Custom Gaming PC Builds in Chennai" />

                {/* Schema Markup */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "ComputerStore",
                                "@id": "https://www.ftdigitalcomputer.in/#computerstore",
                                "name": "FT Digital Computers",
                                "url": "https://www.ftdigitalcomputer.in/",
                                "logo": `https://www.ftdigitalcomputer.in/assets/img/logo/logo.png`,
                                "image": "https://www.ftdigitalcomputer.in/assets/img/banner/heroBanner1.webp",
                                "description":
                                    "Buy high-performance custom gaming PCs from a trusted gaming PC shop in Chennai. Genuine components, expert builds & local support",
                                "telephone": "+918799939992",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "NO 70/55, EC ROAD, near RTO SIGNAL, Netaji Nagar, Thiruvanmiyur",
                                    "addressLocality": "Chennai",
                                    "addressRegion": "TN",
                                    "postalCode": "600041",
                                    "addressCountry": "IN"
                                }
                            },
                            {
                                "@type": "Organization",
                                "@id": "https://www.ftdigitalcomputer.in/#organization",
                                "name": "FT Digital Computers",
                                "url": "https://www.ftdigitalcomputer.in/",
                                "logo": "https://www.ftdigitalcomputer.in/assets/img/logo/logo.png",
                                "sameAs": [
                                    "https://www.facebook.com/ftdchardware/",
                                    "https://www.instagram.com/ft_digital_computer/"
                                ]
                            }
                        ]
                    })}
                </script>
            </Helmet>
            <Banner />
            <Categories />
            <Products />
            <div className="w-full max-w-3xl mx-auto my-8 px-4">
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                    <iframe
                        src="https://www.youtube.com/embed/LI2zrFlWzxY?si=loKUWporLh3gMZn4"
                        title="Ft Digital Computers Introduction Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                </div>
            </div>
        </>
    )
}

export default Home;
