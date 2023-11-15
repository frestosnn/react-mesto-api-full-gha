import '../index.css';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import ImagePopup from './ImagePopup.jsx';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import React from 'react';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { api } from '../utils/Api.js';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import * as auth from '../utils/Auth.js';
import InfoTooltip from './InfoTooltip';
import signGoodImagePath from '../images/sign-good.svg';
import signBadImagePath from '../images/sign-bad.svg';

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [isLoggedIn, setLoggedIn] = useState(false);

  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [email, setEmail] = useState('');
  const [cards, setCards] = useState([]);

  const [isSuccessInfoTooltipStatus, setSuccessInfoTooltipStatus] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then(res => {
          setCurrentUser(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then(res => {
          setCards(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    checkToken();
  }, [isLoggedIn]);

  const checkToken = () => {
    //если есть токен в LocalStorage
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      //отправляем запрос на сервер
      auth
        .getUser(jwt)
        .then(res => {
          if (res) {
            //поменяли стейт
            setLoggedIn(true);

            //изменили email
            setEmail(res.email);

            //отправили на страницу
            navigate('/', { replace: true });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const openInfoTooltip = isSuccess => {
    setInfoTooltipPopupOpen(true);
    setSuccessInfoTooltipStatus(isSuccess);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  };

  //эта функция передается по ссылке onUpdateUser в EditProfilePopup
  const handleUpdateUser = profileData => {
    api
      .editUserInfo(profileData)
      .then(res => {
        //обновляем  глобальный контекст
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = data => {
    api
      .changeAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleLogin = email => {
    setLoggedIn(true);
    setEmail(email);
  };

  const handleCardDelete = cardId => {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(state => state.filter(card => card._id !== cardId));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCardLike = card => {
    // Определяем, лайкнута ли карточка
    const isLiked = card.likes.some(like => like === currentUser._id);

    // В зависимости от того, лайкнута карточка или нет, отправляем разные запросы к API
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then(updatedCard => {
          //как работает проверка: если в массиве карточек стейта есть карточка из res(т е updatedCard)(то есть, это значит, что текущая карточка была изменена), то мы заменяем эту карточку на обновленную(то есть, новую версию карточки, где обновлен массив likes), если нет,то оставляем без изменений.
          setCards(state => state.map(c => (c._id === updatedCard._id ? updatedCard : c)));
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // Если карточка не лайкнута, отправляем запрос на добавление лайка
      api
        .addLike(card._id)
        .then(updatedCard => {
          setCards(state => state.map(c => (c._id === updatedCard._id ? updatedCard : c)));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleAddPlaceSubmit = newCard => {
    api
      .postNewCard(newCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const signOut = () => {
    localStorage.removeItem('jwt');

    navigate('/sign-in', { replace: true });

    setLoggedIn(false);
    setEmail('');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOut={signOut} />

      <Routes>
        <Route
          path="/*"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />}
        />

        <Route
          path="/sign-in"
          element={<Login handleLogin={handleLogin} onChangeStatus={openInfoTooltip} />}
        />

        <Route
          path="/sign-up"
          element={<Register onChangeStatus={openInfoTooltip} handleLogin={handleLogin} />}
        />

        <Route
          path="/"
          element={
            <ProtectedRouteElement loggedIn={isLoggedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />

              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />

              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
              />

              <ImagePopup card={selectedCard} onClose={closeAllPopups} />

              <Footer />
            </ProtectedRouteElement>
          }
        />
      </Routes>

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        text={
          isSuccessInfoTooltipStatus
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте еще раз'
        }
        src={isSuccessInfoTooltipStatus ? signGoodImagePath : signBadImagePath}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
