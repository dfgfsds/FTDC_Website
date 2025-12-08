import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import OtpModal from "../OTPComponent/OtpModal";
import axios from "axios";
import { useAddress } from "../../context/AddressContext";

function Register() {
    const { registerUser } = useAuth();
      const { getAddress } = useAddress();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpToken, setOtpToken] = useState('');
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const validateForm = (data = formData) => {
        const { name, email, contact, password, confirmPassword } = data;

        if (!name || !email || !contact || !password || !confirmPassword) {
            return "All fields are required.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address.";
        }

        if (!/^\d{10}$/.test(contact)) {
            return "Contact must be a 10-digit number.";
        }

        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }

        if (password !== confirmPassword) {
            return "Passwords do not match.";
        }

        return "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        // Live validate while typing
        const validationError = validateForm(updatedFormData);
        setError(validationError);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await axios.post("https://ecomapi.ftdigitalsolutions.org/send-email-opt-user/", {
                email: formData.email,
                 vendor_id: 18
            });
            setOtpToken(response?.data?.token);
            setIsModalOpen(true);
        } catch (err: any) {
            setError(err.message || "Registration failed.");
        }
    };

    const handleOtpSubmit = async (otp: string) => {
        try {
            await axios.post("https://ecomapi.ftdigitalsolutions.org/verify-email-opt/", {
                token: otpToken,
                otp: otp,
                login_type: 'user',
                vendor_id: '18'
            });

            setIsModalOpen(false);

            const res = await registerUser(formData);
            console.log(res, "check");

            navigate("/profile");
            getAddress()
        } catch (err: any) {
            console.error(err.message || "Something went wrong in registration");
            setError(err.message)
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <section className="section-pt pt-6 md:pt-32 px-6 md:px-32">
            <div className="flex justify-center items-center min-h-screen px-4">
                <div className="max-w-[530px] w-full p-4 mt-10 md:p-10 bg-b-neutral-3 rounded-12 shadow-lg">
                    <h2 className="heading-2 text-w-neutral-1 mb-6 text-center font-squares">Register</h2>
                    <p className="text-m-medium text-w-neutral-3 text-center mb-8">
                        Already have an account?{" "}
                        <span onClick={handleLogin} className="inline text-primary font-semibold cursor-pointer">
                            Login
                        </span>
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 mb-6">
                            <div>
                                <label htmlFor="name" className="label flex label-sm text-w-neutral-1 font-borda mb-2 block font-squares">
                                    Name <span className="text-primary ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="border-input-1 w-full px-4 py-3 rounded-md bg-transparent text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="label flex label-sm text-w-neutral-1 font-borda mb-2 block font-squares">
                                    Email <span className="text-primary ml-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="border-input-1 w-full px-4 py-3 rounded-md bg-transparent text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="contact" className="label flex label-sm text-w-neutral-1 font-borda mb-2 block font-squares">
                                    Contact <span className="text-primary ml-1">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    placeholder="Enter your contact number"
                                    className="border-input-1 w-full px-4 py-3 rounded-md bg-transparent text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="label flex label-sm text-w-neutral-1 font-borda mb-2 block font-squares">
                                    Password <span className="text-primary ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="border-input-1 w-full px-4 py-3 pr-12 rounded-md bg-transparent text-white"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="label flex label-sm text-w-neutral-1 font-borda mb-2 block font-squares">
                                    Confirm Password <span className="text-primary ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className="border-input-1 w-full px-4 py-3 pr-12 rounded-md bg-transparent text-white"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                                        aria-label="Toggle confirm password visibility"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                        <a onClick={handleSubmit} className="btn btn-sm btn-primary flex justify-center w-full">
                            Register
                        </a>
                    </form>
                </div>
            </div>

            <OtpModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleOtpSubmit}
            />
        </section>
    );
}

export default Register;
