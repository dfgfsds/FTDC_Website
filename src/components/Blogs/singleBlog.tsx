import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function SingleBlog() {
    const { title } = useParams(); // param from URL
    const [singleBlog, setSingleBlog] = useState<any>(null);

    // slug converter
    function slugConvert(name: string) {
        return name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");
    }

    const getBlogs = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/blog/?vendor_id=18`);
            const allBlogs = response.data?.blogs || [];


            // filter by slug
            const matched = allBlogs.find(
                (b: any) => slugConvert(b.title) === title
            );
            setSingleBlog(matched || null);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        getBlogs();
    }, [title]); // re-run if title changes

    if (!singleBlog) {
        return (
            <div className="bg-black text-white px-6 py-10 max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold font-squares text-primary mt-20">
                    Blog not found
                </h1>
            </div>
        );
    }

    return (
        <div className="bg-black text-white px-6 py-10 max-w-4xl mx-auto space-y-6">
            {/* Title */}
            <h1 className="text-3xl font-bold font-squares text-primary mt-20">
                {singleBlog.title}
            </h1>

            {/* Banner Image */}
            {singleBlog.banner_url && (
                <img
                    src={singleBlog.banner_url}
                    alt={singleBlog.title}
                    className="w-full object-cover rounded-lg"
                />
            )}

            <div
                className=" text-white"
                dangerouslySetInnerHTML={{ __html: singleBlog.content }}
            />
            {/* Author */}
            <p className="text-sm text-gray-400 flex">
                By <span className="font-semibold ml-1">{singleBlog.author}</span>
            </p>
        </div>
    );
}

export default SingleBlog;
