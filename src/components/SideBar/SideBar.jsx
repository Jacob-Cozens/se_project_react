import { useContext } from "react";
import "./SideBar.css";
import avatar from "../../assets/WTWRAvatar.svg";
import CurrentUserContext from "../../context/CurrentUserContext";

function SideBar({ onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__userinfo">
        <img className="sidebar__avatar" src={avatar} alt="Default" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
      <button type="button" onClick={onLogout}>Log Out</button>
    </div>
  );
}

export default SideBar;
