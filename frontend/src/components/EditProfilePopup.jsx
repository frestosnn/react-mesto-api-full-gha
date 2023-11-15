import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { useForm } from 'react-hook-form';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUserInfo = React.useContext(CurrentUserContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: currentUserInfo.name,
      about: currentUserInfo.about
    }
  });

  const nameRegister = register('name', {
    required: {
      value: true,
      message: 'Данное поле обязательно'
    },
    minLength: {
      value: 2,
      message: 'Минимальная длина имени 2 символа'
    },
    maxLength: {
      value: 40,
      message: 'Максимальная длина 40 символов'
    }
  });

  const jobRegister = register('about', {
    required: {
      value: true,
      message: 'Данное поле обязательно'
    },
    minLength: {
      value: 2,
      message: 'Минимальная длина имени 2 символа'
    },
    maxLength: {
      value: 200,
      message: 'Максимальная длина 200 символов'
    }
  });

  //в этой функции data это данные из input
  const onSubmit = data => {
    //здесь вызывается функция handleUpdateUser из компонента App, в которой запрос происходит запрос на сервер
    onUpdateUser(data);
  };

  return (
    <PopupWithForm
      buttonText="Сохранить"
      title="Редактировать профиль"
      name="add_edit"
      isOpen={isOpen}
      onClose={onClose}
      //во встроенную функцию handleSubmit из библиотеки HookForm передается функция-колбэк, в которую посредством замыкания передается данные из инпутов
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        id="user-name-input"
        className={`popup__input ${errors.name ? 'popup__input_type_error' : ''}`}
        type="text"
        placeholder="Имя"
        {...nameRegister}
      />
      <span className="popup__error">{errors.name && errors.name.message}</span>

      <input
        id="user-job-input"
        className={`popup__input ${errors.about ? 'popup__input_type_error' : ''}`}
        type="text"
        placeholder="Профессия"
        {...jobRegister}
      />
      <span className="popup__error">{errors.about && errors.about.message}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
