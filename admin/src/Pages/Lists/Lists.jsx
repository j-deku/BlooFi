import React, { useEffect, useState } from "react";
import "./Lists.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Lists = () => {
  const [list, setList] = useState([]);

  const url = "https://bloofi-backend.onrender.com";
  
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/design/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeDesign = async (designId) => {
    const response = await axios.post(`${url}/api/design/remove`, {
      id: designId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food Lists</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="item image" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeDesign(item._id)} className="cursor">
                <img src={assets.trash} alt="" />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lists;
