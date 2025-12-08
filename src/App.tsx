import './App.css'
import { SidebarProvider } from './components/context/SidebarContext'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Newsletter from './components/NewsLetter/NewsLetter'
import SidebarDrawer from './components/Sidebar/SidebarDrawer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import Sidebar from './components/Sidebar/Sidebar'
import SingleProduct from './components/Products/SingleProduct'
import AllProduct from './components/Products/AllProduct'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import { ProductProvider } from './context/ProductContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ScrollToTopButton from './components/ScrollToTop/ScrollToTop'
import { AuthProvider } from './context/AuthContext'
import GameIndex from './components/Game/GameIndex'
import Register from './components/Register/Register'
import { CartProvider } from './context/CartContext'
import { AddressProvider } from './context/AddressContext'
import { CategoryProvider } from './context/CategotyContext'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import { UsersProvider } from './context/UserContext'
import ShippingPolicy from './pages/ShippingPolicy'
import RefundCancellationPolicy from './pages/RefundCancellationPolicy'
import AllCategories from './components/Categories/AllCategories'
import CustomPcBuild from './components/CustomPC/CustomPC'
import OfferProducts from './components/Products/OfferProducts'
import { OrdersProvider } from './context/OrderContext'
import Orders from './pages/Orders'
import TrendingTabs from './components/Gallery/TrendingTabs'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import FloatingCallButton from './components/FloatingCallButton'
import Blogs from './components/Blogs/blogs'
import SingleBlog from './components/Blogs/singleBlog'

function App() {
  const queryClient = new QueryClient();


  return (
    <Router>
      <ScrollToTopButton />
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <UsersProvider>
            <AuthProvider>
              <CategoryProvider>
                <OrdersProvider>
                  <ProductProvider>
                    <AddressProvider>
                      <SidebarProvider>
                        <Header />
                        <FloatingCallButton />
                        <FloatingWhatsApp />
                        {/* Here is the part that changes based on the route */}
                        <Sidebar />
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/allProducts" element={<AllProduct />} />
                          <Route path="/allProducts/:slug" element={<AllProduct />} />
                          <Route path='/singleProduct/:slug' element={<SingleProduct />} />
                          <Route path='/allCategories' element={<AllCategories />} />
                          <Route path='/profile' element={<Profile />} />
                          <Route path='/login' element={<Login />} />
                          <Route path='/register' element={<Register />} />
                          <Route path="*" element={<NotFound />} />
                          <Route path="game" element={<GameIndex />} />
                          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                          <Route path="/teamsAndCondition" element={<TermsAndConditions />} />
                          <Route path="/shipping-policy" element={<ShippingPolicy />} />
                          <Route path="/refund-cancellation-policy" element={<RefundCancellationPolicy />} />
                          <Route path="/cutomPC" element={<CustomPcBuild />} />
                          <Route path="/offerProduct" element={<OfferProducts />} />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/gallery" element={<TrendingTabs />} />
                          <Route path="/blogs" element={<Blogs />} />
                          <Route path="/blogs/:title" element={<SingleBlog />} />
                        </Routes>
                        <Newsletter />
                        <Footer />
                        <SidebarDrawer />
                      </SidebarProvider>
                    </AddressProvider>
                  </ProductProvider>
                </OrdersProvider>
              </CategoryProvider>
            </AuthProvider>
          </UsersProvider>
        </CartProvider>
      </QueryClientProvider>
    </Router>
  )
}

export default App;

