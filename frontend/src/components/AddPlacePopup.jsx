import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from 'react-hook-form';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'onBlur' });

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
      value: 30,
      message: 'Максимальная длина 30 символов'
    }
  });

  const linkRegister = register('link', {
    required: {
      value: true,
      message: 'Данное поле обязательно'
    },
    pattern: {
      value: /^(ftp|http|https):\/\/[^ "]+$/,
      message: 'Введите корректный URL-адрес'
    }
  });

  const onSubmit = data => {
    onAddPlace(data);
    //сброс полей формы
    reset();
  };

  return (
    <PopupWithForm
      buttonText="Создать"
      title="Новое место"
      name="add_photo"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        id="place-name-input"
        className={`popup__input ${errors.name ? 'popup__input_type_error' : ''}`}
        type="text"
        placeholder="Новое место"
        {...nameRegister}
      />
      <span className="popup__error">{errors.name && errors.name.message}</span>

      <input
        id="place-url-input"
        className={`popup__input ${errors.link ? 'popup__input_type_error' : ''}`}
        placeholder="Ссылка на картинку"
        {...linkRegister}
      />
      <span className="popup__error">{errors.link && errors.link.message}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
