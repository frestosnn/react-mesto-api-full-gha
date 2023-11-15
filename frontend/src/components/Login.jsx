import React from 'react';
import { useState } from 'react';
import * as auth from '../utils/Auth.js';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin, onChangeStatus }) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    //получаем здесь e.target.name и e.target.value
    const { name, value } = e.target;

    //а здесь присваиваем e.target.name: e.target.value
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    //деструктурируем стейт formValue
    const { email, password } = formValue;

    //отправляем запрос
    auth
      .authorize(email, password)
      .then(res => {
        if (res) {
          // Сохраняем токен в LocalStorage
          localStorage.setItem('jwt', res.token);

          //вызываем функцию изменения состояния loggedIn
          handleLogin(email);

          //сбасываем поля
          setFormValue({ email: '', password: '' });

          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
        onChangeStatus(false);
      });
  };

  return (
    <>
      <div className="sign">
        <h2 className="sign__title">Вход</h2>
        <form className="sign__form" onSubmit={handleSubmit}>
          <input
            className="sign__input"
            placeholder="E-mail"
            value={formValue.email}
            onChange={handleChange}
            name="email"
          />

          <input
            className="sign__input"
            placeholder="Пароль"
            value={formValue.password}
            onChange={handleChange}
            name="password"
            type="password"
          />

          <button className="sign__button">Войти</button>
        </form>
      </div>
    </>
  );
}

export default Login;
