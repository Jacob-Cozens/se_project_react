import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import likeHeart from "../../assets/likeHeart.svg";
import likeHeartActive from "../../assets/likeHeartActive.svg";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some(id => id === currentUser._id);
  const likeButtonClassName = `card__like-button ${
    !isLoggedIn && "card__like-button_hidden"
  }`;
  const likeButtonPath = isLiked ? likeHeart : likeHeartActive;

  const handleLike = (e) => {
    e.preventDefault();
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
      <img alt="Like button" className={likeButtonClassName} src={likeButtonPath} onClick={handleLike} />
    </li>
  );
}

export default ItemCard;
