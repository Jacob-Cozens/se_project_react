import "./ModalWithForm.css";
import closeButton from "../../assets/CloseButton.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={handleCloseClick} type="button" className="modal__cls">
          <img src={closeButton} alt="Close button" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__sub">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
