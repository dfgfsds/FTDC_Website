import { useCategoryContext } from "../../context/CategotyContext";

interface Props { }
import cat1 from "../../assets/img/cat/catImg1.jpg";
import cat2 from "../../assets/img/cat/catImg2.jpg";
import cat3 from "../../assets/img/cat/catImg3.jpg";
import cat4 from "../../assets/img/cat/catImg4.jpg";
import cat5 from "../../assets/img/cat/catImg5.jpg";
import cat6 from "../../assets/img/cat/catImg6.jpg";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
const categoryImages = [cat1, cat2, cat3, cat4, cat5, cat6];

function AllCategories(props: Props) {
    const navigate = useNavigate()
    const { category } = useCategoryContext();
    const { } = props

    return (
        <section className="section-pt px-2 md:px-32">
            <h2 className="heading-2 mt-2 text-2xl md:text-4xl font-squares text-split-left mb-2 md:mb-8">
                All Categories
            </h2>
            <div className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mt-4">
                    {category?.map((cat: any, index: number) => {
                        const cleanName = cat.name.endsWith("FTDC") ? cat.name.replace(/ FTDC$/, "") : cat.name;
                        const slug = slugify(cleanName, { lower: true });

                        return (
                            <div key={cat.id} className="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full h-full">
                                {/* Image */}
                                <div className="relative w-full h-[150px] md:h-[250px] overflow-hidden">
                                    <div className="overflow-hidden h-full">
                                        <img
                                            className="w-full 4xl:h-full 3xl:h-[340px] xl:h-[320px] sm:h-[280px] h-[200px] object-cover object-top group-hover:scale-110 transition-1"
                                            src={categoryImages[index % categoryImages.length]}
                                            alt={cleanName}
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-2 md:p-6">
                                    <a
                                        onClick={() =>
                                            navigate(`/allProducts?category=${slug}`, {
                                                state: { categoryName: cleanName }
                                            })
                                        }
                                        className="heading-3 text-xl md:text-3xl link-1 line-clamp-1 mb-4 font-squares text-center cursor-pointer"
                                    >
                                        {cleanName}
                                    </a>
                                    <a
                                        onClick={() =>
                                            navigate(`/allProducts?category=${slug}`, {
                                                state: { categoryName: cleanName }
                                            })
                                        }
                                        className="btn btn-sm btn-primary flex btn-neutral-2 w-full"
                                    >
                                        View Products
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </section>
    )
}

export default AllCategories
