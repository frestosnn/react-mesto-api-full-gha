import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'onBlur' });

  //вызывается функция из App, которая делает запрос к Api и меняет аватар
  const onSubmit = data => {
    onUpdateAvatar(data);
    reset();
  };

  const avatarRegister = register('avatar', {
    required: {
      value: true,
      message: 'Данное поле обязательно'
    },
    pattern: {
      value: /^(ftp|http|https):\/\/[^ "]+$/,
      message: 'Введите корректный URL-адрес'
    }
  });

  return (
    <PopupWithForm
      buttonText="Сохранить"
      title="Обновить аватар"
      name="avatar-change"
      isOpen={isOpen}
      onClose={onClose}
      //передается по ссылке и вызывается при нажатии кнопки
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        id="avatar-url-input"
        className={`popup__input ${errors.avatar ? 'popup__input_type_error' : ''}`}
        placeholder="Ссылка на аватар"
        {...avatarRegister}
      />
      <span className="popup__error">{errors.avatar && errors.avatar.message}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
