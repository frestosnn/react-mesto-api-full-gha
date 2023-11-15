const token = localStorage.getItem('jwt');

export class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (!res.ok) {
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  editUserInfo(infoObj) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: infoObj.name,
        about: infoObj.about
      })
    }).then(this._checkResponse);
  }

  changeAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: 'api.frestosnn.students.nomoredomainsmonster.ru',
  //baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
    Accept: '*/*'
  }
});
