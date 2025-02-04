import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "https://bloofi-backend.onrender.com";
  
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Balloons",
  });

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/design/add`, formData);
    if (response.data) {
      console.log("Product added successfully");
      toast.success("Product added successfully");
      setData({
        name: "",
        description: "",
        price: "",
        category: "Balloons",
      });
      setImage(false);
      document.getElementById("image").value = ""; // Reset file input field after successful upload
      toast.success(response.data.message);
    } else {
      console.log("Failed to add product");
      toast.error("Failed to add product",response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload}
              alt="item image"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onchangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here ..."
          />
        </div>
        <div className="add-product-descriptions flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onchangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write contents here ..."
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onchangeHandler}
              value={data.value}
              name="category"
            >
              <option value="Balloons" selected>Balloons</option>
              <option value="Chairs">Chairs</option>
              <option value="Cakes">Cakes</option>
              <option value="Rooms">Rooms</option>
              <option value="Designs">Designs</option>
              <option value="Flowers">Flowers</option>
              <option value="Carpets">Carpets</option>
              <option value="Tables">Tables</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onchangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
