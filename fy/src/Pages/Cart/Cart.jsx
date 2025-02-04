import React, { useContext } from "react";
import "./Cart.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { decor_lists, cartItems, removeFromCart, getTotalCartAmount,url} =
    useContext(StoreContext);
  const navigate = useNavigate();

  const printPage = () => {
    window.print();
  };

  return (
    <div className="cart">
      <div className="cart-item">
        <div className="cart-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
          <p>
            <img onClick={printPage} src={assets.printIcon2} alt="print" />
          </p>
        </div>
        <br />
        <hr />
        {decor_lists.map((item,index) => {
          if (cartItems[item._id] > 0 ) {
            return (
              <React.Fragment key={item._id || index}>
                <div key={item._id} className="cart-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p>
                    <img
                      onClick={() => removeFromCart(item._id)}
                      className="delete"
                      src={assets.trash_icon}
                      alt=""
                    />
                  </p>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promoCode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promoCode-input">
              <input type="text" placeholder="Enter promoCode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
