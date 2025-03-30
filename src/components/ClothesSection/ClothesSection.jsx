import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleCardClick, clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="">
        <p>Your items</p>
        <button>+ Add New Clothes</button>
      </div>
      <div className="clothes-section__card">
        
      </div>
    </div>
  );
}

export default ClothesSection;
