import { useEffect } from 'react';
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
