export const BASE_URL = 'https://api.frestosnn.students.nomoredomainsmonster.ru';

//'http://localhost:3000';

//'https://api.frestosnn.students.nomoredomainsmonster.ru';

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
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res => checkResponse(res));
};

export const authorize = (login, pass) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: pass, email: login })
  }).then(res => checkResponse(res));
};

export const getUser = token => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  }).then(res => checkResponse(res));
};
