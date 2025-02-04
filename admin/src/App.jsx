import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Add from "./Pages/Add/Add";
import Lists from "./Pages/Lists/Lists";
import Orders from "./Pages/Orders/Orders";

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/SideBar/Sidebar";
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add/>} />
          <Route path="/list" element={<Lists />} />
          <Route path="/order" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
