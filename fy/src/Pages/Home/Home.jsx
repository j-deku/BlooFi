import { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import DesignDisplay from "../../components/DesignDisplay/DesignDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import { toast } from "react-toastify";
import Bot from "../../components/Bot/Bot";
const Home = () => {
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const handleVerified = (event) => {
      if (event.data?.verified) {
        toast.success("User Verified Successfully. Redirecting ...");

        window.location.href = "/";
      }
    };
    window.addEventListener("message", handleVerified, false);
    return () => window.removeEventListener("message", handleVerified, false);
  }, []);

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <DesignDisplay category={category} />
      <Bot/>
      <AppDownload />
    </div>
  );
};

export default Home;
