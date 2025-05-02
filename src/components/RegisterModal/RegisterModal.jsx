import { useState, useEffect } from "react";

import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ handleCloseClick, isOpen, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password, name, imageUrl });
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setImageUrl("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign up"
      buttonText="Sign up"
      handleCloseClick={handleCloseClick}
      handleSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
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

export default RegisterModal;
