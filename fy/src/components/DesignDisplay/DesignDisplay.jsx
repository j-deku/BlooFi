import { useContext } from 'react';
import PropTypes from 'prop-types';
import './DesignDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import DesignItem from '../DesignItem/DesignItem';

const DesignDisplay = ({ category }) => {
  const { decor_lists, searchTerm } = useContext(StoreContext);

  if (!decor_lists) {
    return <p>Loading designs...</p>;
  }

  const filteredDesigns = decor_lists.filter(
    (item) =>
      (category === 'All' || category === item.category) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()))
);

  return (
    <div className="design-display" id="design-display">
      <h2>Top Designs Near You</h2>

      <div className="design-display-list">
        {filteredDesigns.length > 0 ? (
          filteredDesigns.map((item) => (
            <DesignItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="error-message">
            Oops! ... <br /> No designs found for &quot;{searchTerm}&quot; in this category❗
          </p>
        )}
      </div>
    </div>
  );
};
DesignDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};

export default DesignDisplay;
