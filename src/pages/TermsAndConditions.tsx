import { useEffect } from "react";

const TermsAndConditions = () => {

        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

    return (
        <div className="bg-black text-white px-6 py-10 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-squares text-primary mt-20">Terms and Conditions</h1>
            <p>
                Welcome to our website! By accessing and using our services, you agree to the following terms and conditions.
            </p>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">1. Acceptance of Terms</h2>
                <p>
                    By using our website, you agree to comply with and be bound by these terms. If you do not agree, please do not use our services.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">2. Use of Our Services</h2>
                <p>
                    You must be at least 18 years old to use our services. You agree not to misuse our website or engage in illegal activities.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">3. Intellectual Property</h2>
                <p>
                    All content on this website, including text, images, and logos, is our property and may not be used without permission.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">4. Limitation of Liability</h2>
                <p>
                    We are not responsible for any damages resulting from the use of our website or services.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold font-squares text-primary">5. Changes to Terms</h2>
                <p>
                    We reserve the right to update these terms at any time. Your continued use of our services constitutes acceptance of any changes.
                </p>
            </div>

            <div>
                <p>If you have any questions, please contact us.</p>
            </div>
        </div>
    );
};

export default TermsAndConditions;
