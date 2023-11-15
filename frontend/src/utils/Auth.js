export const BASE_URL = 'https://auth.nomoreparties.co';

export const checkResponse = res => {
  if (!res.ok) {
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  } else {
    return res.json();
  }
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  }).then(res => checkResponse(res));
};

export const authorize = (login, pass) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: pass, email: login })
  }).then(res => checkResponse(res));
};

export const getUser = token => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(res => checkResponse(res));
};
