import "./SideBar.css";
import avatar from "../../assets/WTWRAvatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__userinfo">
        <img className="sidebar__avatar" src={avatar} alt="Default" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </div>
  );
}

export default SideBar;
