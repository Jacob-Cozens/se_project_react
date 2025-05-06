import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import closeButton from "../../assets/CloseButtonWhite.svg";

function ItemModal({ activeModal, handleCloseClick, onDelete, selectedCard }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser?._id;
  const itemDeleteButtonClassName = `modal__delete ${
    isOwn ? "" : "modal__delete_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_img">
        <button onClick={handleCloseClick} type="button" className="modal__cls">
          <img src={closeButton} alt="Close button" />
        </button>
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="modal__img"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{selectedCard.name}</h2>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
          <button
            onClick={() => onDelete(selectedCard)}
            className={itemDeleteButtonClassName}
            type="button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
