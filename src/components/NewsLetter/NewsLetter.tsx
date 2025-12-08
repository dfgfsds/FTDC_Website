import cat1 from "../../assets/img/cat/catImg1.jpg";


export default function Newsletter() {
    return (
        <section className=" px-8 md:px-32 z-40 ">

            <div className="bg-black text-white p-10 rounded-lg max-w-4xl mx-auto">
                {/* Flex container */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Left Section */}
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-4xl font-squares ">
                            Subscribe to our
                        </h2>
                        <h1 className="text-4xl md:text-6xl mt-10 font-squares font-squares-thin">
                            Newsletter
                        </h1>
                    </div>

                    {/* Right Section (Image) */}
                    <div className="w-full md:w-[400px] lg:w-[500px] h-auto rounded-full overflow-hidden">
                        <img
                            src={cat1} // Change this to your image path
                            alt="Gaming PC"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Input & Button */}
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center  max-w-lg w-full gap-4 sm:gap-0">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="bg-gray-900 text-white flex-1 py-2 px-4 outline-none border border-gray-600 sm:border-none rounded-full "
                    />
                    <button className="btn btn-sm btn-primary mx-auto flex text-sm md:text-md btn-neutral-2 justify-center">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
}
