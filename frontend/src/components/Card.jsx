import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import React from 'react';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleDelete = () => {
    onCardDelete(card._id);
  };

  const handleLike = () => {
    onCardLike(card);
  };

  const currentUserInfo = React.useContext(CurrentUserContext);

  //условие для отображения иконки удаления
  const isOwn = card.owner === currentUserInfo._id;

  //условия для отображения лайков
  const isLiked = card.likes.some(card => {
    return card === currentUserInfo._id;
  });

  return (
    <div className="photo__item">
      <img className="photo__image" src={card.link} onClick={handleCardClick} alt={card.name} />
      {isOwn && <button className="photo__delete" type="button" onClick={handleDelete} />}
      <div className="photo__text-area">
        <h2 className="photo__title">{card.name}</h2>
        <div className="photo__wrapp">
          <button
            className={`photo__like ${isLiked ? 'photo__like_active' : ''}`}
            onClick={handleLike}
          ></button>
          <span className="photo__like-numbers">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
