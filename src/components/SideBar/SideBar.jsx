import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function SideBar({ onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const name = currentUser?.name;
  const avatar = currentUser?.avatar;




  return (
    <div className="sidebar">
      <div className="sidebar__userinfo">
        <img className="sidebar__avatar" src={avatar} alt="Default" />
        <p className="sidebar__username">{name}</p>
      </div>
      <button type="button" onClick={onLogout}>Log Out</button>
    </div>
  );
}

export default SideBar;
