import Card from './Card.jsx';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  const currentUserInfo = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            alt="Аватар
        пользователя"
            onClick={onEditAvatar}
            src={currentUserInfo.avatar}
          />
          <div className="profile__add-avatar"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUserInfo.name}</h1>
          <button className="profile__edit-button" onClick={onEditProfile} type="button"></button>
          <p className="profile__description">{currentUserInfo.about}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} type="button"></button>
      </section>
      <section className="photo">
        {cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
