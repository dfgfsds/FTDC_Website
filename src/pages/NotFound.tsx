import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
            <div className="flex items-center gap-4 mb-6">
                <AlertTriangle className="text-red-600 w-12 h-12" />
                <h1 className="text-6xl font-bold font-sans text-white">404</h1>
            </div>
            <p className="text-xl text-gray-400 mb-8 font-light">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link to="/" className="btn btn-lg btn-primary rounded-12 text-white">
                ⬅ Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
