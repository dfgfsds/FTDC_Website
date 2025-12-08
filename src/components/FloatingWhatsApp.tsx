import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom"; // ✅ React Router

const FloatingWhatsApp = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const phoneNumber = "918799939992";
  const message = encodeURIComponent("Hello! I am interested in your services.");

  // ✅ Replace usePathname with location.pathname
  const isProductPage = location.pathname.startsWith("/productLandingPage/");

  const bottomClass = isProductPage && isMobile ? "bottom-20" : "bottom-5";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed left-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 ${bottomClass}`}
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
};

export default FloatingWhatsApp;
