import { HelpCircle, LucideShoppingCart, Menu, Search } from "lucide-react";
import logo from "../../assets/img/logo/logo.png";
import { useSidebar } from "../context/SidebarContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { User, LogOut } from "lucide-react";
import userImage from "../../assets/img/user32.png";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import PCIcon from "../../assets/img/PC.png"
import GameIcon from "../../assets/img/GAME.png"
import { useUsersContext } from "../../context/UserContext";

interface Props { }

function Header(props: Props) {
    const { } = props;
    const { toggleSidebar } = useSidebar();
    const { isLoggedIn, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const { userData } = useUsersContext();

    // State for search input
    const [searchQuery, setSearchQuery] = useState("");

    // Handle navigation after 3 seconds
    useEffect(() => {
        if (searchQuery !== "") {
            const timer = setTimeout(() => {
                navigate(`/allProducts?query=${searchQuery}`);
            }, 3000);

            // Cleanup timeout if user types again or component unmounts
            return () => clearTimeout(timer);
        } 
    }, [searchQuery, navigate]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery !== "") {
            navigate(`/allProducts?query=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate('/allProducts')
        }
    };

    const handleCart = () => {
        navigate("/cart");
    };

    const handleHome = () => {
        navigate("/");
    };

    return (
        <header id="header" className="fixed w-full z-[999]">
            <div className="mx-auto relative">
                <div id="header-nav" className="w-full px-24p bg-b-neutral-3 relative">
                    <div className="flex items-center justify-between gap-x-2 mx-auto py-20p">
                        <nav className="relative xl:grid xl:grid-cols-12 flex justify-between items-center gap-24p text-semibold w-full">
                            <div className="3xl:col-span-6 xl:col-span-5 flex items-center 3xl:gap-x-10 gap-x-5">
                                <a onClick={handleHome} className="shrink-0 cursor-pointer">
                                    <img
                                        className="xl:w-[170px] sm:w-36 w-30 h-auto shrink-0"
                                        src={logo}
                                        alt="brand"
                                    />
                                </a>
                                <form
                                    onSubmit={handleSearchSubmit}
                                    className="hidden lg:flex items-center sm:gap-3 gap-2 min-w-[300px] max-w-[670px] w-full px-20p py-16p bg-b-neutral-4 rounded-full">
                                    <span className="flex-c icon-20 text-white">
                                        <Search size={20} />
                                    </span>
                                    <input
                                        autoComplete="off"
                                        className="bg-transparent w-full"
                                        type="text"
                                        name="search"
                                        id="search"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </form>
                            </div>
                            <div className="3xl:col-span-6 xl:col-span-7 flex items-center xl:justify-between justify-end w-full">
                                <a
                                    href="/cutomPC"
                                    className="hidden md:inline-flex items-center gap-3 pl-1 py-1 pr-6 rounded-full bg-[rgba(242,150,32,0.10)] text-w-neutral-1 text-base"
                                >
                                    <span className="size-48p flex-c text-b-neutral-4 bg-primary rounded-full icon-32">
                                        <img src={PCIcon} height={32} width={32} />
                                    </span>
                                    Build your Gaming Beast
                                </a>

                                <a
                                    href="game"
                                    className="hidden md:inline-flex items-center gap-3 pl-1 py-1 pr-6 rounded-full bg-[rgba(242,150,32,0.10)] text-w-neutral-1 text-base"
                                >
                                    <span className="size-48p flex-c text-b-neutral-4 bg-primary rounded-full icon-32">
                                        <img src={GameIcon} height={32} width={32} />
                                    </span>
                                    Play Game
                                </a>
                                <div className="flex items-center lg:gap-x-32p gap-x-5">
                                    <div className=" md:flex items-center gap-1 shrink-0">
                                        <div className="relative">
                                            <a
                                                onClick={handleCart}
                                                className="btn-c btn-c-lg btn-c-dark-outline relative"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                                    <path d="M17 17h-11v-14h-2" />
                                                    <path d="M6 5l14 1l-1 7h-13" />
                                                </svg>
                                                {cartItems?.cart_items?.length > 0 && (
                                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-ping-slow">
                                                        {cartItems.cart_items.length}
                                                    </span>
                                                )}
                                            </a>
                                        </div>
                                    </div>
                                    {isLoggedIn ? (
                                        <div className="relative group">
                                            {/* Button with user info */}
                                            <button className="flex items-center gap-2 text-white font-semibold">
                                                <img
                                                    src={userData?.profile_image ? userData?.profile_image : userImage}
                                                    alt="Avatar"
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <span className="hidden md:inline">{userData?.name}</span>
                                                <svg className="w-4 h-4 fill-white" viewBox="0 0 20 20">
                                                    <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                                                </svg>
                                            </button>

                                            {/* Dropdown */}
                                            <div className="absolute right-0 mt-3 w-48 bg-neutral-900 text-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                                <ul className="py-2">
                                                    <li
                                                        className="px-4 py-2 hover:bg-neutral-800 cursor-pointer transition flex gap-2"
                                                        onClick={() => navigate("/profile")}
                                                    >
                                                        <User size={20} /> Profile
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 hover:bg-neutral-800 cursor-pointer transition flex gap-2"
                                                        onClick={() => navigate("/orders")}
                                                    >
                                                        <LucideShoppingCart size={20} /> Orders
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 hover:bg-neutral-800 cursor-pointer transition flex gap-2"
                                                        onClick={() => navigate("/help")}
                                                    >
                                                        <HelpCircle size={20} /> Help
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 hover:bg-neutral-800 cursor-pointer transition flex gap-2"
                                                        onClick={() => logout()}
                                                    >
                                                        <LogOut size={20} /> Logout
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    ) : (
                                        <div className="md:flex hidden gap-3">
                                            <h2
                                                onClick={() => navigate("/login")}
                                                className="font-squares font-bold text-md cursor-pointer hover:text-[#ff340c]"
                                            >
                                                Login
                                            </h2>
                                            /
                                            <h2
                                                onClick={() => navigate("/register")}
                                                className="font-squares font-bold text-md cursor-pointer hover:text-[#ff340c]"
                                            >
                                                Sign Up
                                            </h2>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="md:hidden ml-4 cursor-pointer"
                                    onClick={toggleSidebar}
                                >
                                    <Menu />
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;