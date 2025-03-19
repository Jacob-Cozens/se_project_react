import "./ItemModal.css";

function ItemModal({ activeModal, handleCloseClick, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_img">
        <button onClick={handleCloseClick} type="button" className="modal__cls">
          CLOSE
        </button>
        <img src={card.link} alt="" className="modal__img" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
