import { useEffect } from "react";

const PrivacyPolicy = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-black text-white px-6 py-10 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-squares text-primary mt-20">Privacy Policy</h1>
            <p>
                Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Information We Collect</h2>
                <p>
                    We may collect personal information such as your name, email address, and contact details when you register or interact with our website.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>To provide and maintain our services</li>
                    <li>To improve our website and user experience</li>
                    <li>To communicate with you regarding updates or promotions</li>
                    <li>To comply with legal obligations</li>
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Data Protection</h2>
                <p>
                    We implement security measures to protect your personal data. However, no method of transmission over the internet is 100% secure.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Third-Party Services</h2>
                <p>
                    We may use third-party services for analytics and advertisements, which may collect their own information in accordance with their privacy policies.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Your Rights</h2>
                <p>
                    You have the right to access, modify, or delete your personal information. If you have any requests, please contact us.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. Please review this page periodically for any changes.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at <span className="underline">info@ftdigitalcomputer.in</span></p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
