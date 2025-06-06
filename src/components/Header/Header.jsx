import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/WTWRLogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../context/CurrentUserContext";

function Header({ handleAddClick, weatherData, onRegister, onLogin }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  const name = currentUser ? currentUser?.name : "";
  const currentAvatar = currentUser?.imageUrl !== "" ? true : false;

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {currentUser?.name ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user">
              <p className="header__username">{currentUser.name}</p>
              {currentAvatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar"> {name[0]?.toUpperCase()} </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <>
          <div className="header__unknown-user">
            <button
              type="text"
              className="header__unknown-user_button"
              onClick={onRegister}
            >
              Sign up
            </button>
            <button
              type="text"
              className="header__unknown-user_button"
              onClick={onLogin}
            >
              Log in
            </button>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
