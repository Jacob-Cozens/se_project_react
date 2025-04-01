import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick = [] }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__text">Your items</p>
        <button onClick={() => handleAddClick()} className="clothes-section__btn">
          + Add New
        </button>
      </div>
      <div className="clothes-section__card">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={() => handleCardClick(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
