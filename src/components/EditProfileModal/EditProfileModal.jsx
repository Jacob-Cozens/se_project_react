import { useState, useEffect, useContext } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";
CurrentUserContext;

function EditProfileModal({ handleCloseClick, isOpen, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ name, avatar });
  };

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Edit Profile"
      buttonText="Save changes"
      handleCloseClick={handleCloseClick}
      handleSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>
      <label className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="edit-imageUrl"
          placeholder="Image URL"
          onChange={handleAvatarChange}
          value={avatar}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
