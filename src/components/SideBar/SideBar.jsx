import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function SideBar({ onLogout, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const name = currentUser?.name;
  const avatar = currentUser?.avatar;

  return (
    <div className="sidebar">
      <div className="sidebar__userinfo">
        <img className="sidebar__avatar" src={avatar} alt="Default" />
        <p>{name}</p>
      </div>
      <div className="sidebar__column">
        <button
          type="button"
          className="sidebar__column_btn"
          onClick={onUpdateProfile}
        >
          Change profile data
        </button>
        <button type="button" className="sidebar__column_btn" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
