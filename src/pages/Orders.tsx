import { ChevronsRight } from "lucide-react";
import bgImage from "../assets/img/breadcrumbImg.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useOrdersContext } from "../context/OrderContext";

function Orders() {
  const { Orders } = useOrdersContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Breadcrumb Section */}
      <section className="pt-30p px-8 md:px-32">
        <div className="section-pt">
          <div
            className="relative bg-cover bg-no-repeat rounded-24 overflow-hidden"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="container">
              <div className="grid grid-cols-12 gap-30p relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]">
                <div className="lg:col-start-2 lg:col-end-12 col-span-12">
                  <h2 className="heading-2 text-w-neutral-1 mb-3 font-squares text-3xl">
                    My Orders
                  </h2>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link
                        to="/"
                        className="breadcrumb-link text-inherit hover:underline"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <span className="breadcrumb-icon">
                        <ChevronsRight className="w-4 h-4" />
                      </span>
                    </li>
                    <li className="breadcrumb-item">
                      <span className="breadcrumb-current">Orders</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="overlay-11" />
          </div>
        </div>
      </section>

      {/* Orders Section */}
      <section className="section-pb pt-15 px-8 md:px-32">
        <div className="container">
          <div className="grid grid-cols-12 gap-30p">
            <div className="xxl:col-start-2 xxl:col-end-12 col-span-12">
              {Orders?.length > 0 ? (
                Orders?.map((order:any) => (
                  <div
                    key={order.id}
                    className=" p-5 mb-6 rounded-2xl shadow-sm border space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-w-neutral-1">
                        Order #{order.id}
                      </h3>
                      <span className="text-sm text-w-neutral-4">
                        {new Date(order.created_at).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-w-neutral-1">
                      <p>
                        <strong>Status:</strong> {order.status} /{" "}
                        {order.payment_status}
                      </p>
                      <p>
                        <strong>Total:</strong> ₹{order.total_amount}
                      </p>
                      <p>
                        <strong>Delivery:</strong> {order.delivery_partner}
                      </p>
                      <p>
                        <strong>Customer:</strong>{" "}
                        {order.consumer_address.customer_name}
                      </p>
                      <p className="sm:col-span-2">
                        <strong>Address:</strong>{" "}
                        {order.consumer_address.address_line1},{" "}
                        {order.consumer_address.city},{" "}
                        {order.consumer_address.state} -{" "}
                        {order.consumer_address.postal_code}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-w-neutral-1">
                        Items
                      </h4>
                      <ul className="divide-y border rounded-md">
                        {order.order_items.map((item:any) => (
                          <li
                            key={item.id}
                            className="flex items-center gap-4 p-4"
                          >
                            <img
                              src={item.product.image_urls[0]}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-grow">
                              <p className="font-medium text-w-neutral-1">
                                {item.product.name}
                              </p>
                              <p className="text-sm text-w-neutral-4">
                                Qty: {item.quantity} | ₹{item.price}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 gap-6">
                  <h3 className="text-2xl font-semibold text-w-neutral-1 font-squares">
                    No Orders Found
                  </h3>
                  <p className="text-w-neutral-4">
                    Looks like you haven't placed any orders yet.
                  </p>
                  <Link to="/allProducts" className="btn btn-primary px-6 py-2 rounded-12">
                    Shop Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Orders;
