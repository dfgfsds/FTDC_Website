import { useEffect, useState } from "react";
import userImage from "../../assets/img/user32.png";
import coverImage from "../../assets/img/profileCover1.png";
import "./Profile.css";
import AddressSection from "./AddressSection";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../../context/UserContext";

interface ProgressBarProps {
    target: number;
}

export function ProgressBar({ target }: ProgressBarProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            current += 1;
            if (current >= target) {
                clearInterval(interval);
                setProgress(target);
            } else {
                setProgress(current);
            }
        }, 10);
        return () => clearInterval(interval);
    }, [target]);

    return (
        <div className="flex items-center gap-24p overflow-x-hidden">
            <div className="flex items-center w-full">
                <div className="w-3.5 h-5 bg-primary" />
                <div className="relative w-full h-2.5 bg-w-neutral-3">
                    <span
                        style={{ width: `${progress}%` }}
                        className="progressbar-1 block h-full bg-primary"
                    ></span>
                </div>
            </div>
            <div className="flex items-center text-w-neutral-1">
                <h4 className="heading-4">{progress}</h4>
                <h4 className="heading-4">%</h4>
            </div>
        </div>
    );
}

function Profile() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { userData, updateUser } = useUsersContext();

    // State for edit form
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const [form, setForm] = useState({
        name: userData?.name || "",
        email: userData?.email || "",
        contact_number: userData?.contact_number || "",
        profile_image: null as File | null,
    });

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [submitMessage, setSubmitMessage] = useState("");

    // Sync form with userData changes
    useEffect(() => {
        setForm({
            name: userData?.name || "",
            email: userData?.email || "",
            contact_number: userData?.contact_number || "",
            profile_image: null,
        });
    }, [userData]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
        setSubmitMessage("");
    };

    // Handle form submission
    const handleSubmit = async () => {
        const errors: { [key: string]: string } = {};

        if (!form.name.trim()) {
            errors.name = "Name is required";
        }
        if (!form.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = "Email is invalid";
        }
        if (!form.contact_number.trim()) {
            errors.contact_number = "Contact number is required";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("contact_number", form.contact_number);
            formData.append("id", userData?.id || "");
            formData.append("updated_by", "user");
            formData.append("role", "3");
            formData.append("vendor", "18");

            if (profileImage) {
                formData.append("profile_image", profileImage);
            }

            await updateUser(formData); // Make sure your API expects FormData

            setSubmitMessage("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            setSubmitMessage("Failed to update profile. Please try again.");
        }
    };


    return (
        <section className="section-pt overflow-visible px-8 md:px-32">
            <div className="container">
                {!isLoggedIn ? (
                    <div className="text-center bg-b-neutral-3 p-10 rounded-12 my-20p">
                        <h2 className="heading-3 text-w-neutral-1 mb-4 font-squares">
                            Login to see your details
                        </h2>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition"
                        >
                            Login
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="relative">
                            <div className="relative w-full h-[250px] overflow-hidden">
                                <div className="glitch-effect">
                                    <div className="glitch-thumb first">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={coverImage}
                                            alt="cover"
                                        />
                                    </div>
                                    <div className="glitch-thumb second">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={coverImage}
                                            alt="cover glitch"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-30p bg-b-neutral-3 rounded-12 pb-30p">
                            <div className="4xl:col-start-2 4xl:col-end-12 col-span-12 max-4xl:px-48p">
                                <div className="relative flex 3xl:items-end max-3xl:items-center 3xl:justify-between max-3xl:flex-col gap-30p 3xl:mt-[70px] xl:-mt-52 lg:-mt-44 md:-mt-36 sm:-mt-30 -mt-20 4xl:mb-[70px] mb-60p">
                                    <div className="3xl:order-1 order-2 flex text-center divide-x divide-shap">
                                        <div className="pr-6">
                                            <h2 className="heading-40 text-w-neutral-1 mb-1">75</h2>
                                            <span className="text-m-medium text-w-neutral-4/70">
                                                Friends
                                            </span>
                                        </div>
                                        <div className="px-24p">
                                            <h2 className="heading-40 text-w-neutral-1 mb-1">140</h2>
                                            <span className="text-m-medium text-w-neutral-4/70">
                                                Winning
                                            </span>
                                        </div>
                                        <div className="pl-6">
                                            <h2 className="heading-40 text-w-neutral-1 mb-1">241</h2>
                                            <span className="text-m-medium text-w-neutral-4/70">
                                                Tournaments
                                            </span>
                                        </div>
                                    </div>

                                    <div className="3xl:order-2 order-1 3xl:absolute 3xl:bottom-0 3xl:left-1/2 3xl:-translate-x-1/2 max-3xl:flex-col-c z-[4]">
                                        <img
                                            className="avatar xl:size-60 lg:size-52 md:size-44 sm:size-40 size-28 border border-secondary"
                                            src={userData?.profile_image ? userData?.profile_image : userImage}
                                            alt="profile"
                                        />

                                    </div>
                                </div>
                            </div>


                        </div>

                        {isEditing ? (
                            <div className="bg-b-neutral-3  p-6 rounded-md mx-auto">
                                <h3 className="heading-3 text-w-neutral-1 mb-4 font-squares">
                                    Edit Profile
                                </h3>
                                <div className="grid gap-4">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="name"
                                            className="text-sm text-w-neutral-1 mb-1 flex"
                                        >
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className={`border px-4 py-2 rounded bg-transparent text-w-neutral-1 w-full ${formErrors.name
                                                ? "border-red-500"
                                                : "border-gray-500"
                                                }`}
                                        />
                                        {formErrors.name && (
                                            <span className="text-red-500 text-sm mt-1">
                                                {formErrors.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="email"
                                            className="text-sm text-w-neutral-1 mb-1 flex"
                                        >
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className={`border px-4 py-2 rounded bg-transparent text-w-neutral-1 w-full ${formErrors.email
                                                ? "border-red-500"
                                                : "border-gray-500"
                                                }`}
                                        />
                                        {formErrors.email && (
                                            <span className="text-red-500 text-sm mt-1">
                                                {formErrors.email}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col ">
                                        <label
                                            htmlFor="contact_number"
                                            className="text-sm text-w-neutral-1 mb-1 flex"
                                        >
                                            Contact Number{" "}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="contact_number"
                                            id="contact_number"
                                            value={form.contact_number}
                                            onChange={handleChange}
                                            placeholder="Enter your contact number"
                                            className={`border px-4 py-2 rounded bg-transparent text-w-neutral-1 w-full ${formErrors.contact_number
                                                ? "border-red-500"
                                                : "border-gray-500"
                                                }`}
                                        />
                                        {formErrors.contact_number && (
                                            <span className="text-red-500 text-sm mt-1">
                                                {formErrors.contact_number}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="profileImage" className="text-sm text-w-neutral-1 mb-1 flex">
                                            Profile Image <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="file"
                                            name="profileImage"
                                            id="profileImage"
                                            accept="image/*"
                                            onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                                            className="border px-4 py-2 rounded bg-transparent text-w-neutral-1 w-full border-gray-500"
                                        />
                                    </div>

                                </div>
                                <div className="flex gap-4 mt-6 justify-center mb-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setFormErrors({});
                                            setSubmitMessage("");
                                            setForm({
                                                name: userData?.name || "",
                                                email: userData?.email || "",
                                                contact_number: userData?.contact_number || "",
                                                profile_image: null,
                                            });
                                        }}
                                        className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                {submitMessage && (
                                    <p
                                        className={`text-center mt-4 ${submitMessage.includes("successfully")
                                            ? "text-green-500"
                                            : "text-red-500"
                                            }`}
                                    >
                                        {submitMessage}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="text-center bg-b-neutral-3 ">
                                <h3 className="heading-3 text-w-neutral-1 mb-3 text-split-top font-squares">
                                    {userData?.name}
                                </h3>
                                <p className="text-m-medium text-w-neutral-4">
                                    {userData?.email}
                                </p>
                                <p className="text-m-medium text-w-neutral-4">
                                    {userData?.contact_number}
                                </p>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition mt-4 mb-4"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        )}

                        <section className="section-pb pt-60p overflow-visible">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div>
                                    <div className="bg-b-neutral-3 p-40p rounded-12">
                                        <h3 className="heading-3 text-w-neutral-1 mb-30p text-split-left font-squares">
                                            Game Stats
                                        </h3>
                                        <div className="bg-b-neutral-4 p-16p flex-col-c">
                                            <img
                                                className="avatar size-80p"
                                                src={userImage}
                                                alt="game stats"
                                            />
                                            <a
                                                href="game-details.html"
                                                className="heading-5 text-w-neutral-1 link-1 line-clamp-1 my-2"
                                            >
                                                Lunar Legends
                                            </a>
                                            <div className="flex items-center border-t border-shap text-center pt-2">
                                                <div>
                                                    <span className="text-sm text-w-neutral-1 mb-1">
                                                        Matches
                                                    </span>
                                                    <span className="text-sm text-primary">275</span>
                                                </div>
                                                <div className="3xl:mx-7 mx-20p w-1px h-full bg-shap" />
                                                <div>
                                                    <span className="text-sm text-w-neutral-1 mb-1">
                                                        Winnings
                                                    </span>
                                                    <span className="text-sm text-primary">145</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="m-4 px-2 *:bg-b-neutral-3 *:rounded-12 *:px-40p rounded-12">
                                    <div>
                                        <h3 className="heading-3 p-2 text-w-neutral-1 mb-20p text-split-left font-squares">
                                            Level 24
                                        </h3>
                                        <ProgressBar target={75} />
                                        <a
                                            href="#"
                                            className="text-m-medium text-w-neutral-1 link-1 pt-2 pb-4"
                                        >
                                            View All Level
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <AddressSection />
                        </section>
                    </>
                )}
            </div>
        </section>
    );
}

export default Profile;
