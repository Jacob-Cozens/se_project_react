import "./Header.css";
import logo from "../../assets/WTWRLogo.svg";
import avatar from "../../assets/WTWRAvatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        ADD CLOTHES
      </button>
      <div className="header__user">
        <p className="header__username">NAME</p>
        <img src={avatar} alt="NAME" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
