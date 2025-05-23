import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  handleAddClick = [],
  clothingItems,
  isLoggedIn,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__text">Your items</p>
        <button
          onClick={() => handleAddClick()}
          className="clothes-section__btn"
        >
          + Add New
        </button>
      </div>
      <div className="clothes-section__card">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={() => handleCardClick(item)}
            isLoggedIn={isLoggedIn}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
