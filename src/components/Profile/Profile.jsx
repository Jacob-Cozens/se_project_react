import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, handleCardClick, handleAddClick, onLogout }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">{<SideBar onLogout={onLogout} />}</section>
      <section className="profile__clothes-section">
        {
          <ClothesSection
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
            handleAddClick={handleAddClick}
          />
        }
      </section>
    </div>
  );
}

export default Profile;
