import React, { useEffect, useRef, useState } from "react";

interface OtpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (otp: string) => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const inputRefs = useRef<HTMLInputElement[]>([]);

    // Trigger animation when modal opens
    useEffect(() => {
        if (isOpen) {
            setOtp(Array(6).fill(""));
            inputRefs.current[0]?.focus();
            setTimer(30);
            setCanResend(false);
            setTimeout(() => setShowAnimation(true), 10);
        } else {
            setShowAnimation(false);
        }
    }, [isOpen]);

    useEffect(() => {
        let countdown: ReturnType<typeof setInterval>;
        if (!canResend && isOpen) {
            countdown = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1) {
                        clearInterval(countdown);
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [canResend, isOpen]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const finalOtp = otp.join("");
        if (finalOtp.length === 6) {
            onSubmit(finalOtp);
        }
    };

    const handleResend = () => {
        if (!canResend) return;
        console.log("OTP resent!");
        setCanResend(false);
        setTimer(30);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 dark:bg-opacity-70 px-4">
            <div
                className={`relative bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-sm text-center transform transition-all duration-300 ${showAnimation ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
            >
                {/* Close Icon */}
                {/* <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button> */}

                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100 font-squares">Enter OTP</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    We’ve sent a 6-digit code to your Email
                </p>

                <div className="flex justify-center gap-2 mb-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                if (el) inputRefs.current[index] = el;
                            }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            inputMode="numeric"
                            className="w-10 h-12 text-center border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xl text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>

                <div className="mb-5">
                    <button
                        onClick={handleResend}
                        disabled={!canResend}
                        className={`text-sm font-medium transition ${canResend ? "text-blue-600 hover:underline" : "text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        {canResend ? "Resend OTP" : `Resend in ${timer}s`}
                    </button>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full btn-primary  text-white py-2 rounded-md  transition font-medium"
                >
                    Verify OTP
                </button>
                <button
                    onClick={onClose}
                    className="mt-3 text-sm text-gray-500 dark:text-gray-400 hover:underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default OtpModal;
