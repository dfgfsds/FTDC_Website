import { Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import logo from "../../assets/img/logo/logo.png"
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate()

    const socialLinks = [
        { Icon: Facebook, url: 'https://www.facebook.com/ftdchardware/' },
        { Icon: Twitter, url: 'https://x.com/ft_digicomputer' },
        { Icon: Instagram, url: 'https://www.instagram.com/ft_digital_computer/' },
        { Icon: Linkedin, url: 'https://www.linkedin.com/in/ft-digital-computer' },
        { Icon: Youtube, url: 'www.youtube.com/@ft_digital_computer' },
    ];
    return (
        <footer className="bg-black text-white py-10 section-pt px-8 md:px-52">
            <div className="md:flex md:justify-between md:gap-20">
                {/* Left Section */}
                <div className="md:w-1/2">
                    <a href="/" className="shrink-0">
                        <img className="w-72 h-auto shrink-0" src={logo} alt="brand" />
                    </a>
                    <p className="text-gray-400 mt-4 md:max-w-md">
                        Become visionary behind a sprawling metropolis in Metropolis Tycoon Plan empire progress.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-6">
                        {socialLinks.map(({ Icon, url }, idx) => (
                            <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 p-3 rounded-lg"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Center + Right Section */}
                <div className="mt-10 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-10 md:w-1/2">
                    {/* Main Pages */}
                    <div>
                        <h3 className="text-lg font-semibold font-squares">Main pages</h3>
                        <hr className="border-gray-600 my-2" />
                        <ul className="text-gray-400 space-y-2">
                            {[
                                { label: "Categories", url: "/allCategories" },
                                { label: "Shop", url: "/allProducts" },
                                { label: "Custom PC Build", url: "/cutomPC" },
                                { label: "Home", url: "/" },
                                { label: "Our Gallery", url: "/gallery" },
                                { label: "Blogs", url: "/blogs" }
                            ].map(({ label, url }) => (
                                <li key={label} className="group flex items-center gap-1 hover:text-primary transition-1">
                                    <ChevronRight className="group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1 w-4 h-4" />
                                    <a href={url} className="text-m-regular text-w-neutral-3">{label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Email */}
                    <div className="">
                        <h3 className="text-lg font-semibold font-squares">Contact Us</h3>
                        <hr className="border-gray-600 my-2" />
                        <a href="mailto:info@ftdigitalcomputer.in" className="text-gray-400 mt-2 block hover:underline ml-4">
                            info@ftdigitalcomputer.in
                        </a>
                        <a href="tel:+918799939992" className="text-gray-400 mt-2 block hover:underline ml-4">
                            +91 87999 39992
                        </a>
                    </div>

                </div>
            </div>

            {/* Bottom Line */}
            <div className="border-y-2 border-dashed border-shap my-8"></div>

            {/* Footer Bottom */}
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-white space-y-4 md:space-y-0">
                {/* Left side */}
                <div className="text-center md:text-left space-y-1">
                    <p>Copyright © 2025</p>
                    <p className="flex">
                        Designed By <span className="text-orange-500 font-semibold ml-2">FTDS</span>
                    </p>
                </div>

                {/* Right side */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center">
                    <a onClick={() => navigate('/privacy-policy')} className="hover:text-primary transition-colors cursor-pointer">
                        Privacy Policy
                    </a>
                    <a onClick={() => navigate('/teamsAndCondition')} className="hover:text-primary transition-colors cursor-pointer">
                        Terms & Conditions
                    </a>
                    <a onClick={() => navigate('/shipping-policy')} className="hover:text-primary transition-colors cursor-pointer">
                        Shipping Policy
                    </a>
                    <a onClick={() => navigate('/refund-cancellation-policy')} className="hover:text-primary transition-colors cursor-pointer">
                        Refund Cancellation Policy
                    </a>
                </div>
            </div>
        </footer>
    );
}
