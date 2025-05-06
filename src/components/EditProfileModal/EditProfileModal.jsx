import { useState, useEffect } from "react";

import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ handleCloseClick, isOpen, onUpdateProfile }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ name, imageUrl });
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Edit Profile"
      buttonText="Save"
      handleCloseClick={handleCloseClick}
      handleSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
