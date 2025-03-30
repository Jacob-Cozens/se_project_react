import "./SideBar.css";
import avatar from "../../assets/WTWRAvatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default" />
      <p className="sidebar__username">Buddy Boy</p>
    </div>
  );
}

export default SideBar;
