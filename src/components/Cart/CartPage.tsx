import { ChevronsRight, Minus, Plus } from "lucide-react";
import bgImage from "../../assets/img/breadcrumbImg.png";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckoutSidebar from "./CheckoutSidebar";
import { useAuth } from "../../context/AuthContext";

function CartPage() {
    const navigate = useNavigate();
    const { cartItems, increaseQuantity, decreaseQuantity } = useCart();
    const { isLoggedIn } = useAuth();
    const [isCheckoutOpen, setCheckoutOpen] = useState(false);

    const cartProducts = cartItems?.cart_items?.map((item: any) => {
        return {
            ...cartItems?.products[item.product],
            cart_item_id: item.id,
            productQuantity: item.quantity
        };
    });

    cartItems.cartProducts = cartProducts;

    const subtotal = cartItems?.cartProducts?.reduce(
        (acc: number, product: any) => acc + Number(product.price) * Number(product.productQuantity),
        0
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            {/* breadcrumb */}
            <section className="pt-30p px-8 md:px-32">
                <div className="section-pt">
                    <div className="relative bg-cover bg-no-repeat rounded-24 overflow-hidden" style={{ backgroundImage: `url(${bgImage})` }}>
                        <div className="container">
                            <div className="grid grid-cols-12 gap-30p relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]">
                                <div className="lg:col-start-2 lg:col-end-12 col-span-12">
                                    <h2 className="heading-2 text-w-neutral-1 mb-3 font-squares text-3xl">
                                        Shop Cart
                                    </h2>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/" className="breadcrumb-link text-inherit hover:underline">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <span className="breadcrumb-icon">
                                                <ChevronsRight className="w-4 h-4" />
                                            </span>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <span className="breadcrumb-current">Shop Cart</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="overlay-11" />
                    </div>
                </div>
            </section>

            {/* product cart section */}
            <section className="section-pb pt-15 px-8 md:px-32">
                <div className="container">
                    <div className="grid grid-cols-12 gap-30p">
                        <div className="xxl:col-start-2 xxl:col-end-12 col-span-12">

                            {cartItems?.cartProducts?.length > 0 ? (
                                <>
                                    {/* Cart Table */}
                                    <div className="overflow-x-auto scrollbar-sm w-full mb-5">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="md:text-2xl sm:text-xl font-squares">
                                                    <th className="min-w-[320px] w-full text-md">Product</th>
                                                    <th className="3xl:min-w-[157px] min-w-[144px] p-16p">Price</th>
                                                    <th className="3xl:min-w-[206px] min-w-[144px] p-16p text-center">Quantity</th>
                                                    <th className="3xl:min-w-[163px] min-w-[144px] p-16p text-center">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody className="*:bg-b-neutral-3 sm:divide-y-[20px] divide-y-[16px] divide-b-neutral-4">
                                                {cartItems.cartProducts.map((product: any) => (
                                                    <tr key={product.id} className="*:p-20p">
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="shrink-0 bg-b-neutral-2 p-24p rounded-12">
                                                                    <img
                                                                        className="size-[74px] rounded-12"
                                                                        src={product?.image_urls[0]}
                                                                        alt={product?.name}
                                                                    />
                                                                </div>
                                                                <span onClick={() => navigate('/singleProduct', { state: product })} className="text-m-medium text-w-neutral-1 link-1 cursor-pointer">
                                                                    {product?.name}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="text-m-medium text-w-neutral-1">
                                                                ₹{product?.price}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="flex-c">
                                                                <div className="qtySelector inline-flex items-center justify-center border border-shap px-16p sm:py-3 py-2 rounded-12 w-[144px] *:h-full">
                                                                    <button
                                                                        onClick={() =>
                                                                            decreaseQuantity({
                                                                                product_id: product.id,
                                                                            })
                                                                        }
                                                                        className="decreaseQty flex-c size-12 icon-24"
                                                                    >
                                                                        <Minus className="w-4 h-4" />
                                                                    </button>
                                                                    <input
                                                                        min={1}
                                                                        value={Number(product.productQuantity)}
                                                                        type="number"
                                                                        className="qtyValue btn-xsm bg-transparent min-w-12 max-w-18 text-base text-w-neutral-1 text-center"
                                                                        readOnly
                                                                    />
                                                                    <button
                                                                        onClick={() =>
                                                                            increaseQuantity({
                                                                                product_id: product.id,
                                                                                quantity: Number(product?.productQuantity) + 1,
                                                                            })
                                                                        }
                                                                        className="increaseQty flex-c size-12 icon-24"
                                                                    >
                                                                        <Plus className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="text-m-medium text-w-neutral-1 text-center">
                                                                ₹{Number(product?.productQuantity) * product?.price}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Cart Total */}
                                    <div className="bg-b-neutral-3 flex max-md:flex-wrap items-center justify-between gap-20p p-30p">
                                        <div>
                                            <span className="heading-4 font-normal text-w-neutral-1 mb-3">
                                                Subtotal
                                            </span>
                                            <p className="text-l-reguler text-w-neutral-4">
                                                Taxes and shipping calculated at checkout
                                            </p>
                                        </div>
                                        <div className="flex-y gap-30p">
                                            <span className="heading-4 text-w-neutral-1 font-normal inline">
                                                ₹{subtotal?.toFixed(2)}
                                            </span>
                                            <a
                                                onClick={() => {
                                                    if (isLoggedIn) {
                                                        setCheckoutOpen(true);
                                                    } else {
                                                        navigate('/login');
                                                    }
                                                }}
                                                className="btn btn-md btn-primary rounded-12"
                                            >
                                                Checkout
                                            </a>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                // Empty Cart UI
                                <div className="flex flex-col items-center justify-center text-center py-20 gap-6">
                                    <h3 className="text-2xl font-semibold text-w-neutral-1 font-squares">No products in cart</h3>
                                    <p className="text-w-neutral-4">Looks like your cart is empty. Start shopping now!</p>
                                    <button
                                        onClick={() => navigate("/allProducts")}
                                        className="btn btn-primary px-6 py-2 rounded-12"
                                    >
                                        Shop More
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                {isCheckoutOpen && (
                    <div
                        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end"
                        onClick={() => setCheckoutOpen(false)} // click on background closes
                    >
                        <div
                            className="w-[400px] bg-white h-full p-4 overflow-auto"
                            onClick={(e) => e.stopPropagation()} // prevent closing on inner click
                        >
                            <CheckoutSidebar
                                isOpen={isCheckoutOpen}
                                onClose={() => setCheckoutOpen(false)}
                                cartProducts={cartItems?.cartProducts}
                                subtotal={subtotal?.toFixed(2)}
                            />
                        </div>
                    </div>
                )}

            </section>
        </div>
    );
}

export default CartPage;
