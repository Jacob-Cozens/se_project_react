import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import likeHeart from "../../assets/likeHeart.svg";
import likeHeartActive from "../../assets/likeHeartActive.svg";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);
  const likeButtonClassName = isLoggedIn
    ? "card__like-button"
    : "card__like-button-hidden";
  const likeButtonPath = isLiked ? likeHeartActive : likeHeart;

  const handleLike = (e) => {
    e.preventDefault();
    onCardLike({ id: item._id, isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__info">
        <div className="card__name">{item.name}</div>
        <img
          alt="Like button"
          className={likeButtonClassName}
          src={likeButtonPath}
          onClick={handleLike}
        />
      </div>
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
