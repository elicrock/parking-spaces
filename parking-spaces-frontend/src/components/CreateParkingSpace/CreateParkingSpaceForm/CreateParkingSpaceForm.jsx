import { useState, useEffect } from 'react';
import './CreateParkingSpaceForm.css';
import { useForm } from 'react-hook-form';
import useAddressSearch from '../../../hooks/useAddressSearch';

function CreateParkingSpaceForm({ onClose }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: 'all' });

  const [isSubmitError, setIsSubmitError] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [selectedAddressFromHint, setSelectedAddressFromHint] = useState('');

  const watchAddress = watch('address') || '';

  const { isHintAddress, showHint, setShowHint, fetchAddress } = useAddressSearch(
    selectedAddressFromHint,
    (lat, lon) => {
      setLatitude(lat);
      setLongitude(lon);
    },
  );

  useEffect(() => {
    if (watchAddress) {
      fetchAddress(watchAddress);
    }
  }, [fetchAddress, watchAddress]);

  const handleHintAddressSelect = hintAddress => {
    setValue('address', hintAddress);
    setSelectedAddressFromHint(hintAddress);
    clearErrors(['address']);
  };

  const handleAddressChange = event => {
    setValue('address', event.target.value);
    setShowHint(true);
  };

  const onSubmit = async ({ name, address, maxPlaces, locationType, ownership, availability, schedule }) => {
    try {
      console.log(latitude);
      console.log(longitude);
      console.log(name);
      onClose();
    } catch (err) {
      console.log(err);
      setIsSubmitError('Произошла ошибка сервера, попробуйте повторить запрос позднее!');
    }
  };

  // useEffect(() => {
  //   clearErrors(['name', 'address', 'maxPlaces', 'locationType', 'ownership', 'availability', 'schedule']);
  //   setIsSubmitError('');
  // }, [clearErrors, setIsSubmitError]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="form__input"
        placeholder="Введите название парковочного пространства"
        {...register('name', {
          required: 'Поле обязательно для заполнения',
        })}
      />
      <span className={`form__error-message ${errors.name ? 'form__error-message_active' : ''}`}>
        {errors?.name?.message}
      </span>
      <input
        type="text"
        className="form__input"
        name="address"
        placeholder="Введите адрес парковочного пространства"
        value={watchAddress}
        onChange={handleAddressChange}
        {...register('address', {
          required: 'Поле обязательно для заполнения',
        })}
      />
      {showHint && isHintAddress.length > 0 && watchAddress && (
        <ul className="form__hint-address">
          {isHintAddress.map((address, index) => (
            <li key={index} onClick={() => handleHintAddressSelect(address)}>
              {address}
            </li>
          ))}
        </ul>
      )}
      <span className={`form__error-message ${errors.address ? 'form__error-message_active' : ''}`}>
        {errors?.address?.message}
      </span>
      <div className="form__coordinates">
        <p className="form__coordinates-title">Координаты</p>
        <div className="form__coordinates-latitude">
          Широта: <span>{latitude || '-'}</span>
        </div>
        <div className="form__coordinates-longitude">
          Долгота: <span>{longitude || '-'}</span>
        </div>
      </div>
      <input
        type="number"
        className="form__input"
        name="maxPlaces"
        min="0"
        placeholder="Введите количество мест"
        {...register('maxPlaces', {
          required: 'Поле обязательно для заполнения',
        })}
      />
      <span className={`form__error-message ${errors.maxPlaces ? 'form__error-message_active' : ''}`}>
        {errors?.maxPlaces?.message}
      </span>
      <select
        name="locationType"
        className="form__select"
        defaultValue=""
        {...register('locationType', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        <option value="" disabled>
          Тип расположения:
        </option>
        <option value="linear" className="form__option">
          Линейное
        </option>
        <option value="areal" className="form__option">
          Площадное
        </option>
      </select>
      <span className={`form__error-message ${errors.locationType ? 'form__error-message_active' : ''}`}>
        {errors?.locationType?.message}
      </span>
      <select
        name="ownership"
        className="form__select"
        defaultValue=""
        {...register('ownership', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        <option value="" disabled>
          Принадлежность:
        </option>
        <option value="municipal" className="form__option">
          Муниципальное
        </option>
        <option value="private" className="form__option">
          Частное
        </option>
      </select>
      <span className={`form__error-message ${errors.ownership ? 'form__error-message_active' : ''}`}>
        {errors?.ownership?.message}
      </span>
      <select
        name="availability"
        className="form__select"
        defaultValue=""
        {...register('availability', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        <option value="" disabled>
          Доступность:
        </option>
        <option value="free" className="form__option">
          Бесплатное
        </option>
        <option value="paid" className="form__option">
          Платное
        </option>
        <option value="conditionalFree" className="form__option">
          Условно бесплатное
        </option>
      </select>
      <span className={`form__error-message ${errors.availability ? 'form__error-message_active' : ''}`}>
        {errors?.availability?.message}
      </span>
      {watch('availability') === 'conditionalFree' && (
        <>
          <input
            type="text"
            className="form__input"
            name="schedule"
            placeholder="Введите график работы"
            {...register('schedule', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          <span className={`form__error-message ${errors.schedule ? 'form__error-message_active' : ''}`}>
            {errors?.schedule?.message}
          </span>
        </>
      )}
      <span className={`form__error-submit ${isSubmitError ? 'form__error-submit_active' : ''}`}>{isSubmitError}</span>
      <button type="submit" className="form__submit-btn" disabled={!isValid || isSubmitting}>
        Создать
      </button>
    </form>
  );
}

export default CreateParkingSpaceForm;
