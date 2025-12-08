import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // using lucide icons
import { useAddress } from "../../context/AddressContext";

function Login() {
    const { login } = useAuth();
    const { getAddress } = useAddress();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/profile"; // fallback
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        try {
            await login(formData.email, formData.password);
            navigate(from);
            getAddress()
        } catch (error: any) {
            setError(error.message || "Something went wrong");
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        // Live validate while typing
        const validationError = validateForm(updatedFormData);
        setError(validationError);
    };

    const validateForm = (data = formData) => {
        const { email, password } = data;
        if (!email || !password) {
            return "All fields are required.";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address.";
        }
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <section className="section-pt pt-6 md:pt-24 px-6 md:px-32">
            <div className="flex justify-center items-center min-h-screen px-4">
                <div className="max-w-[530px] w-full p-4 md:p-10 bg-b-neutral-3 rounded-12 shadow-lg">
                    <h2 className="heading-2 text-w-neutral-1 mb-6 text-center font-squares">Login</h2>
                    <p className="text-m-medium text-w-neutral-3 text-center mb-8">
                        Don’t have an account?{" "}
                        <span onClick={handleRegister} className="inline text-primary font-semibold cursor-pointer">
                            Sign Up
                        </span>
                    </p>

                    <form >
                        <div className="grid grid-cols-1 gap-6 mb-6">
                            <div>
                                <label htmlFor="userEmail" className="label label-sm text-w-neutral-1 font-borda mb-2 block font-squares">
                                    Email
                                </label>
                                <input
                                    className="border-input-1 w-full px-4 py-3 rounded-md bg-transparent text-white"
                                    type="email"
                                    name="email"
                                    id="userEmail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="label label-sm text-w-neutral-1 font-borda mb-2 block font-squares">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="border-input-1 w-full px-4 py-3 pr-12 rounded-md bg-transparent text-white"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
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
                        </div>

                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                        <a onClick={handleSubmit} className="btn btn-sm btn-primary flex justify-center w-full">
                            Login
                        </a>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;
