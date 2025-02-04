import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./DesignItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const DesignItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  if (!id) {
    console.error("Invalid or missing 'id' for DesignItem.");
    return null;
  }

  const quantity = cartItems?.[id] || 0; // Safely retrieve quantity
  const imageUrl = image ? `${url}/images/${image}` : assets.default_image;

  return (
    <div className="design-item">
      <div className="design-item-img-container">
        <img
          className="design-item-image"
          src={imageUrl}
          alt={`Design item - ${name}`}
          onError={(e) => (e.target.src = assets.default_image)}
        />
        {!quantity ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_small}
            alt="Add item to cart"
          />
        ) : (
          <div className="design-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.minus_small2}
              alt="Decrease item quantity"
            />
            <p>{quantity}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.plus_small2}
              alt="Increase item quantity"
            />
          </div>
        )}
      </div>

      <div className="design-item-info">
        <div className="design-item-name-rating">
          <p>{name || "Unnamed Item"}</p>
          <img src={assets.star_4} alt="Item rating" />
        </div>
        <p className="design-item-description">
          {description || "No description available."}
        </p>
        <p className="design-item-price">${price?.toFixed(2) || "0.00"}</p>
      </div>
    </div>
  );
};
DesignItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default DesignItem;
