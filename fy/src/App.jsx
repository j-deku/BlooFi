import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import MyOrders from "./Pages/MyOrder/MyOrders";
import Verify from "./Pages/Verify/Verify";
import Footer from "./components/Footer/Footer";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import ProfileDetails from "./components/ProfileDetails/ProfileDetails";
import PrivacyPolicy from "./components/Policy/PrivacyPolicy";
import Faq from "./components/FAQ/Faq";
import DeliveryInfo from "./components/DeliveryInfo/DeliveryInfo";
import AboutUs from "./components/AboutUs/AboutUs";
import { loadAllImages } from "./utils/loadImages";
import VerifyOTP from "./components/VerifyOTP/VerifyOTP";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import Forms from "./components/Forms/Forms";

const App = () => {
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(
    () => !sessionStorage.getItem("assetsLoaded")
  );

  useEffect(() => {
    const preloadAssets = async () => {
      if (!localStorage.getItem("assetsLoaded")) {
        await loadAllImages();
        localStorage.setItem("assetsLoaded", "true");
      }
      sessionStorage.setItem("assetsLoaded", "true");
      setIsLoading(false);
    };

    if (isLoading) {
      preloadAssets();
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <ToastContainer position="top-left" />
      {login && <Forms setLogin={setLogin} />}
      <div className="app">
        <Navbar setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newsFeed" element={<NewsFeed />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/deliveryInfo" element={<DeliveryInfo />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/message-us" element={<Faq />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/profile" element={<ProfileDetails />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route
            path="/verify-otp"
            element={<VerifyOTP setLogin={setLogin} />}
          />
          <Route path="/password-reset" element={<PasswordReset />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
