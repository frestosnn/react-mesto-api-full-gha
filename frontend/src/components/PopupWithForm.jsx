import React from 'react';
function PopupWithForm({ buttonText, children, title, name, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button className="popup__button-close" onClick={onClose} type="button" />
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__button-save" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
