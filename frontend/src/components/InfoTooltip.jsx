import React from 'react';
function InfoTooltip({ isOpen, onClose, text, src }) {
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className={`popup  ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_sign">
        <button className="popup__button-close" onClick={handleCloseClick} type="button" />
        <img className="popup__img-sign" src={src}></img>
        <p className="popup__text">{text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
