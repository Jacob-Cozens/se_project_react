import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import likeHeart from "../../assets/likeHeart.svg";
import likeHeartActive from "../../assets/likeHeartActive.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item?.likes?.includes(currentUser?._id) || false;

  const handleLike = (e) => {
    e.PreventDefault();
    onCardLike({ id: item._id, isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__img"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
