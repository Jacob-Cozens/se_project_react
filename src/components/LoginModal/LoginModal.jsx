import { useState, useEffect } from "react";

import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ handleCloseClick, isOpen, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log in"
      buttonText="Log in"
      handleCloseClick={handleCloseClick}
      handleSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          type="text"
          name="email"
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
          type="text"
          name="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
