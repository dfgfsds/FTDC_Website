import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface Props { }
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Blogs(props: Props) {
    const navigate = useNavigate();
    const { } = props;

    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getBlogs = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/blog/?vendor_id=18`);
            setBlogs(response.data?.blogs || []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    function slugConvert(name: string) {
        return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    }

    return (
        <div className="bg-black text-white px-6 py-10 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-squares text-primary mt-20">Latest Blogs</h1>

            {loading ? (
                <p className="text-center text-gray-400">Loading...</p>
            ) : blogs.length === 0 ? (
                <p className="text-center text-gray-400">No Blogs Found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogs.map((blog: any, index: number) => (
                        <div
                            key={index}
                            className="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full h-full"
                        >
                            {/* Banner Image */}
                            <div className="relative w-full h-[150px] md:h-[250px] overflow-hidden">
                                <div className="overflow-hidden h-full">
                                    <img
                                        className="w-full object-cover object-top group-hover:scale-110 transition-1"
                                        src={blog.banner_url}
                                        alt={blog.title}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-2 md:p-6">
                                {/* Title */}
                                <h3 className="heading-3 text-xl md:text-3xl line-clamp-1 mb-2 font-squares text-center">
                                    {blog.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white text-sm md:text-base mb-3 line-clamp-2">
                                    {blog.description}
                                </p>

                                {/* Author */}
                                <p className="text-xs text-gray-500 mb-3 flex">
                                    By <span className="font-semibold ml-1">{blog.author}</span>
                                </p>

                                {/* View Blog Button */}
                                <button
                                    onClick={() => navigate(`/blogs/${slugConvert(blog.title)}`)}
                                    className="btn btn-sm btn-primary flex w-full justify-center"
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Blogs;
