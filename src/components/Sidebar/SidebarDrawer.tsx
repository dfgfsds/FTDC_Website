import { useSidebar } from "../context/SidebarContext";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo/logo.png";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function SidebarDrawer() {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const { isLoggedIn, logout } = useAuth();
  const { cartItems } = useCart();
  
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    closeSidebar(); // Close the sidebar after navigation
  };

  const handleLogout = () => {
    logout();
    closeSidebar(); // Close the sidebar after logout
  };
  // Navigation Links
  const navLinks: { label: string; path: string; action?: () => void }[] = [
    { label: "Home", path: "/" },
    { label: "All Products", path: "/allProducts" },
    { label: "Build your PC", path: "/" },
    {
      label: isLoggedIn && cartItems.cartProducts?.length > 0
        ? `Cart (${cartItems.cartProducts?.length})`
        : "Cart",
      path: "/cart",
    },
    { label: "Play game", path: "/game" },
    { label: "All Categories", path: "/allCategories" },
    { label: "Orders", path: "/orders" },
  ];

  if (isLoggedIn) {
    navLinks.push({ label: "Logout", path: "#", action: handleLogout });
  } else {
    navLinks.push({ label: "Login", path: "/login" });
    navLinks.push({ label: "Register", path: "/register" });
  }

  return (
    <>
      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#0d0d0d] text-white z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <img src={logo} alt="FTDC Logo" className="w-[120px]" />
          <button
            onClick={closeSidebar}
            className="bg-orange-500 rounded-full p-1"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Nav Links */}
        <ul className="overflow-y-auto max-h-[calc(100vh-80px)] px-4 py-2 space-y-2">
          {navLinks.map(({ label, path, action }) => (
            <li
              key={label}
              onClick={() => (action ? action() : handleNavigation(path))}
              className="flex justify-between items-center border-b border-gray-700 py-3 cursor-pointer hover:text-orange-500 transition"
            >
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
