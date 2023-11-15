import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import headerLogoPath from '../images/logo.svg';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogoPath} alt="Логотип сервиса Место" />
      <div className="header__container">
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <p className="header__text">{email}</p>
                <Link to="sign-in" onClick={onSignOut} className="header__link">
                  Выйти{' '}
                </Link>
              </>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
