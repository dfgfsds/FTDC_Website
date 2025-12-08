import { useEffect, useState } from "react";
import "./product.css";
import { Activity, Search, Star, StarHalf, StarIcon } from "lucide-react";
import { useProductContext } from "../../context/ProductContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import slugify from "slugify";
import { useCategoryContext } from "../../context/CategotyContext";

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

function AllProduct() {
    const { products, isLoading, isError } = useProductContext();
    const navigate = useNavigate();
    const { addToCart } = useCart()
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryQuery, setCategoryQuery] = useState("");

    const [categoryHead, setCategoryHead] = useState("");
    const [starSize, setStarSize] = useState(16);
    useEffect(() => {
        const updateSize = () => {
            setStarSize(window.innerWidth < 640 ? 14 : 18);
        };

        updateSize(); // set initially
        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const location = useLocation();
    const { category } = useCategoryContext();


    const { state } = location as { state: { categoryName?: string } };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query');
        const category = searchParams.get('category');

        setSearchQuery(query || "");
        setCategoryHead(category || "");
        setCategoryQuery(category === "211" ? "211" : "");
    }, [location]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const PRODUCTS_PER_PAGE = 27;
    const [currentPage, setCurrentPage] = useState(1);

    function getCategorySlug(name: any) {
        if (!name) return "";
        const cleanName = name?.endsWith("FTDC")
            ? name?.replace(/ FTDC$/, "")
            : name;
        return slugify(cleanName, { lower: true });
    }

    const filteredProducts = products?.filter((product: any) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        let matchesCategory = true;

        if (categoryQuery) {
            // Exact match based on category name
            matchesCategory =
                getCategorySlug(product.category_name) === getCategorySlug(categoryQuery);
        } else if (state?.categoryName) {
            // If categoryName comes from router state, match it
            matchesCategory =
                getCategorySlug(product.category_name) ===
                getCategorySlug(state.categoryName);
        }

        return matchesSearch && matchesCategory;
    }) || [];


    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSearchQuery(""); // clear search on pagination
        window.scrollTo(0, 0);
    };

    function slugConvert(name: string) {
    return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

    return (
        <section className="section-pt px-2 md:px-32">
            <div className="mt-4 ">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-2 md:mb-8">
                    {
                        categoryHead && (
                            <div className="flex justify-between gap-2">
                                <h1 className="text-w-neutral-1 mt-2 mb-2  text-4xl font-sans ">
                                    Discover our best-selling products in the <strong>{state?.categoryName}</strong> category.
                                </h1>
                                <div>
                                    <button onClick={() => navigate('/allProducts')} className="btn btn-sm btn-primary flex btn-neutral-2 justify-center">Reset </button>
                                </div>
                            </div>
                        )
                    }
                    {categoryQuery ?
                        <>
                            {/* <h2 className=" text-4xl font-squares text-split-left">
                                {`Showing ${state?.categoryName} Products`}
                            </h2>
                            <button onClick={() => navigate('/allProducts')} className="btn btn-sm btn-primary flex btn-neutral-2 justify-center">Reset </button> */}
                            {/* ✅ Only show when category is selected */}

                            {categoryQuery && (
                                <>
                                    <p className="text-w-neutral-1 mt-2 mb-6 text-md text-4xl">
                                        Refurbished Laptops in Chennai – Affordable & Reliable
                                    </p>
                                    {/* <button onClick={() => navigate('/allProducts')} className="btn btn-sm btn-primary flex btn-neutral-2 justify-center">Reset </button> */}
                                </>
                            )}
                        </>
                        :
                        (
                            categoryHead ? null : (
                                <h2 className="heading-2 mt-2 text-2xl md:text-4xl font-squares text-split-left">
                                    All Products
                                </h2>
                            )
                        )

                    }

                </div>
                <div className="relative w-full md:hidden mt-2">
                    <span className="absolute inset-y-0 left-3 flex items-center text-white">
                        <Search size={20} />
                    </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="bg-transparent border border-gray-100 text-white w-full pl-10 pr-4 py-2 rounded-full"
                    />
                </div>

                {isError ? (
                    <div className="text-center text-red-500 font-medium text-xl py-10">
                        Something went wrong while fetching products. Please try again later.
                    </div>
                ) : isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <ProductSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 mx-2 md:mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <aside className="hidden lg:block col-span-1 bg-b-neutral-2 rounded-xl p-4">
                            <h3 className="text-xl font-squares font-semibold mb-4 text-white">Filters</h3>

                            {/* Example Filter: Category */}
                            <div className="mb-4">
                                {/* <h4 className="font-medium text-white mb-2">Category</h4> */}
                                <div className="flex flex-col gap-2">
                                    {/* <button onClick={() => navigate('/allProducts')} className="text-left text-white hover:underline">All</button> */}
                                    {category?.map((cat: any) => (
                                        <button
                                            onClick={() =>
                                                navigate(`/allProducts?category=${cat.id}`, {
                                                    state: {
                                                        categoryName: cat.name.endsWith("FTDC")
                                                            ? cat.name.replace(/ FTDC$/, "")
                                                            : cat.name,
                                                    },
                                                })
                                            }
                                            key={cat.id}
                                            className={`text-left px-3 py-2 rounded-md transition-colors duration-200
    ${getCategorySlug(cat?.name) === getCategorySlug(state?.categoryName)
                                                    ? "bg-primary text-white"  // active style
                                                    : "text-white hover:bg-neutral-700"}`
                                            }
                                        >

                                            {cat.name.endsWith("FTDC") ? cat.name.replace(/ FTDC$/, "") : cat.name}
                                        </button>

                                    ))}
                                    {/* <button onClick={() => setCategoryQuery("")} className="text-left text-white hover:underline">All</button> */}

                                    {/* Add more if needed */}
                                </div>
                            </div>

                            {/* Example Filter: Price */}
                            <div className="mb-4">
                                <h4 className="font-medium text-white mb-2">Price Range</h4>
                                {/* You can add sliders or buttons here */}
                            </div>
                        </aside>
                        <div className="col-span-3 h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentProducts?.map((product: any, index: number) => (
                                <div
                                    key={index}
                                    className="relative bg-b-neutral-3 rounded-12 group overflow-hidden w-full "
                                >
                                    {/* Image */}
                                    <div className="relative w-full h-[180px] md:h-[180px] overflow-hidden">
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

                                    {/* Content */}
                                    <div className="p-1 md:p-4 text-center">
                                        <div className="min-h-[32px] md:min-h-[40px] w-full">
                                            <p
                                                className="text-left line-clamp-2 w-full block text-[10px] md:text-[12px] mt-2 md:mt-4 font-squares cursor-pointer"
                                                onClick={() => navigate(`/singleProduct/${slugConvert(product?.name)}`, { state: product })}
                                            >
                                                {product.name}
                                            </p>
                                        </div>


                                        <div className="md:flex items-center justify-between text-w-neutral-1 my-3">
                                            <div className="flex items-center text-primary">
                                                {Array.from({ length: 5 }).map((_, index) => {
                                                    const rating = product.rating ?? 4; // default to 4
                                                    return (
                                                        <span key={index}>
                                                            {index < Math.floor(rating) ? (
                                                                <StarIcon size={starSize} fill="yellow" stroke="yellow" />
                                                            ) : index < rating ? (
                                                                <StarHalf size={starSize} fill="yellow" stroke="yellow" />
                                                            ) : (
                                                                <Star size={starSize} className="text-w-neutral-4" />
                                                            )}
                                                        </span>
                                                    );
                                                })}
                                            </div>

                                            <div className="flex items-center gap-2  md:mt-0">
                                                <span className="span text-s-medium">Online</span>
                                                <Activity size={20} className="text-w-neutral-4" />
                                            </div>
                                        </div>

                                        <span className="text-m-medium text-w-neutral-1 block  text-md md:text-lg text-left">
                                            Price: ₹ {product.price}/-
                                        </span>
                                        <span className="text-m-medium text-gray-500 justify-end flex mb-2 text-md md:text-md text-left line-through">
                                            ₹ {(parseFloat(product?.price) || 0) + (parseFloat(product?.discount) || 0)}.00/-
                                        </span>
                                        {/* <button className="btn btn-sm btn-primary flex btn-neutral-2 justify-center w-full">
                                        Add to Cart
                                    </button> */}
                                        {/* ✅ Add to Cart */}
                                        <button
                                            onClick={() => {
                                                const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
                                                if (isLoggedIn) {
                                                    addToCart({ product_id: product.id, quantity: 1 });
                                                } else {
                                                    navigate("/login");
                                                }
                                            }}
                                            className="btn btn-sm btn-primary mx-auto w-full flex btn-neutral-2 text-sm md:text-md justify-center"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-center mt-8 gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;

                    const isNearCurrent =
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1 ||
                        page === currentPage - 2 ||
                        page === currentPage + 2;

                    if (
                        totalPages > 7 &&
                        !isNearCurrent
                    ) {
                        if (
                            page === 2 ||
                            page === totalPages - 1
                        ) {
                            return (
                                <span key={page} className="px-2 py-2 text-black">
                                    ...
                                </span>
                            );
                        }
                        return null;
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded ${currentPage === page ? "bg-primary text-white" : "bg-gray-200 text-black"
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}


                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
                >
                    Next
                </button>
            </div>
            {categoryQuery && (
                <>
                    <div className="mt-4">
                        <h2 className=" mt-2 mb-2 text-2xl font-sans">
                            Looking for reasonably priced, secondhand laptops with great performance without breaking the budget? Our specialty at FTDS Hardware is offering sturdy, competitively priced refurbished laptop computers ideal for personal, business, and gaming needs. Whatever your degree of schooling, distance worker, gamer, or business user, we have the perfect refurbished lap for you.
                        </h2>
                        <div className="text-w-neutral-1 mt-2 mb-6 text-md">
                            Offering both online and in-store buying options, we are Chennai's dependable source for gently used PCs, laptops, and accessories.
                        </div>
                        <h2 className="mt-2 mb-2 text-2xl font-sans">Question and Answers </h2>
                        <h2 className=" mt-2 mb-2 text-2xl font-sans">
                            What Are Refurbished Laptops?
                        </h2>
                        <p>
                            Pre-owned, carefully inspected, tested, cleaned, repaired, and returned to first-rate running condition a refurbished laptop is. Unlike used computers without inspections, our refurbished systems are rebuilt under the guidance of our skilled team and completely tested.
                        </p>
                        <h3 className="text-xl font-sans mt-4">All refurbished laptops at FTDS Hardware come with:</h3>
                        <p className="mt-4">1.Full hardware diagnosis and upgrades.</p>
                        <p>2.Freshly installed genuine operating systems.</p>
                        <p>3.Physical cleaning and cosmetic improvement.</p>
                        <p>4.Warranty and after-sales support.</p>
                        <h3 className="text-xl font-sans mt-4">Purchasing a refurbished laptop from FTDS Hardware guarantees a machine that runs like new but at a much reduced cost.</h3>


                        <h2 className=" mb-2 text-2xl font-sans mt-4">Why Purchase Used Laptop Computers from FTDS Hardware?</h2>
                        <h3 className="text-xl font-sans mt-2">Customers pick us for refurbished laptop computers in Chennai for the following reasons:</h3>

                        <h3 className="text-xl font-sans mt-4">Save Large Without Sacraging Quality</h3>
                        <p className="mt-4">Our rebuilt computers save up to 50% over new machines. Within your means, you get top features, great performance, and the newest software.</p>
                        <h3 className="text-xl font-sans mt-4">Professionally Rebuilt and Tested</h3>
                        <p className="mt-4">Every laptop is completely examined and tuned for best operation. We fix or replace broken components, update RAM and SSDs, and ensure the system runs absolutely flawless.</p>
                        <h3 className="text-xl font-sans mt-4">Environmentally Friendly</h3>
                        <p className="mt-4">Selecting a reconditioned laptop advances environmentalism and helps to lower e-waste. It's a wise, environmental decision.</p>
                        <h3 className="text-xl font-sans mt-4">Warranty and Support</h3>
                        <p className="mt-4">We support the caliber of our work. Every laptop comes with a limited warranty and total assistance for any requirement connected to services.</p>


                        <h2 className="text-2xl font-sans mt-4">Our Refurbished Laptop Categories</h2>
                        <h3 className="mt-4 text-xl">Daily Use Restrained Laptops</h3>
                        <p className="mt-4">Perfect for home users, remote professionals, and students, our regular laptops are dependable, quick, and light weight. Use them for pleasure, office work, video conferences, and online surfing.</p>
                        <h3 className="mt-4 text-xl">Refurbished Gaming Laptops</h3>
                        <p className="mt-4">Perfect for home users, remote professionals, and students, our regular laptops are dependable, quick, and light weight. Use them for pleasure, office work, video conferences, and online surfing.</p>

                    </div>
                </>
            )}
        </section>
    );
}

export default AllProduct;
