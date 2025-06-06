import "./ModalWithForm.css";
import closeButton from "../../assets/CloseButton.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleCloseClick,
  handleSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={handleCloseClick} type="button" className="modal__cls">
          <img src={closeButton} alt="Close button" />
        </button>
        <form onSubmit={handleSubmit} className="modal__form">
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
