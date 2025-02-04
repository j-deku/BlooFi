import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import {toast} from "react-toastify"

const PlaceOrder = () => {
  const { getTotalCartAmount,token,decor_lists,cartItems,url } = useContext(StoreContext);

  const [data,setData] =useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({...data, [name]: value }));
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    
    if (!token) {
      console.error("Missing token");
      toast.error("You must be logged in to place an order");
      return;
    } 
    
    let orderItems = [];
    decor_lists.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      status: "pending",
      email:data.email
    };
    
    try {
      let response = await axios.post(url + "/api/order/place",
        orderData,
        { headers: { token } });
      
      if (response.data.success) {
        const { authorization_url } = response.data;
        if (authorization_url) {
          window.location.replace(authorization_url);
        } else {
          console.error("Invalid authorization URL", response.data);
          alert("Error: Invalid authorization URL");
        }
      } else {
        alert("Error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response.data);
        alert('Error placing order: ' + error.response.data);
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={placeOrder} className="placeOrder">
      <div className="placeOrder-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
        <input type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First Name" required />
          <input type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last Name" required />
        </div>
        <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="EMail Address" required />
        <input type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street Name" required/>
        <div className="multi-fields">
          <input type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City Name" required/>
          <input type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State Name"  required/>
        </div>
        <div className="multi-fields">
          <input type="text" name="zipCode" onChange={onChangeHandler} value={data.zipCode} placeholder="Zip code" required />
          <input type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country Name" required/>
        </div>
        <input type="tel" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone +2333 ...." required/>
      </div>
      <div className="placeOrder-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Feed</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
