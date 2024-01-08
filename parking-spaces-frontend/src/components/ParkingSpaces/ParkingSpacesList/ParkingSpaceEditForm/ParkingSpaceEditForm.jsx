import { useState, useEffect } from 'react';
import './ParkingSpaceEditForm.css';
import { useForm } from 'react-hook-form';
import useAddressSearch from '../../../../hooks/useAddressSearch';
import { useUpdateParkingByIdMutation } from '../../../../Api/pakingSpacesApi';
import { updateParkingSpaces } from '../../../../redux/parkingSpaces/parkingsSlice';
import { useDispatch } from 'react-redux';

function ParkingSpaceEditForm({ parkingSpace, onClose, setSelectedSpace }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  const [updateParking, { isLoading }] = useUpdateParkingByIdMutation();
  const dispatch = useDispatch();

  const [isSubmitError, setIsSubmitError] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [selectedAddressFromHint, setSelectedAddressFromHint] = useState('');
  const [isAddressFocused, setIsAddressFocused] = useState(false);

  const watchAddress = watch('address') || '';

  const { isHintAddress, showHint, setShowHint, fetchAddress } = useAddressSearch(
    selectedAddressFromHint,
    (lat, lon) => {
      setLatitude(lat);
      setLongitude(lon);
    },
  );

  useEffect(() => {
    if (parkingSpace) {
      const { name, address, latitude, longitude, maxPlaces, locationType, ownership, availability, schedule } =
        parkingSpace;
      setValue('name', name || '');
      setValue('address', address || '');
      setValue('maxPlaces', maxPlaces || '');
      setValue('locationType', locationType || '');
      setValue('ownership', ownership || '');
      setValue('availability', availability || '');
      setValue('schedule', schedule || '');
      setLatitude(latitude || '');
      setLongitude(longitude || '');
    }
  }, [parkingSpace, setValue]);

  useEffect(() => {
    if (isAddressFocused && watchAddress) {
      fetchAddress(watchAddress);
    }
  }, [fetchAddress, isAddressFocused, watchAddress]);

  const handleHintAddressSelect = hintAddress => {
    setValue('address', hintAddress);
    setSelectedAddressFromHint(hintAddress);
    clearErrors(['address']);
  };

  const handleAddressChange = event => {
    setValue('address', event.target.value);
    setShowHint(true);
  };

  const handleAddressFocus = () => {
    setIsAddressFocused(true);
  };

  const onSubmit = async ({ name, address, maxPlaces, locationType, ownership, availability, schedule }) => {
    try {
      const data = {
        name,
        address,
        maxPlaces,
        locationType,
        ownership,
        availability,
        latitude,
        longitude,
      };

      if (availability === 'Условно бесплатное') {
        data.schedule = schedule;
      }

      const response = await updateParking({ id: parkingSpace._id, data }).unwrap();
      dispatch(updateParkingSpaces(response));
      setSelectedSpace(response);
      onClose();
    } catch (err) {
      console.log(err);
      setIsSubmitError('Произошла ошибка сервера, попробуйте повторить запрос позднее!');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="form__input"
        placeholder="Введите название парковочного пространства"
        disabled={isLoading}
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
        onFocus={handleAddressFocus}
        disabled={isLoading}
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
        disabled={isLoading}
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
        disabled={isLoading}
        {...register('locationType', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        <option value="" disabled>
          Тип расположения:
        </option>
        <option value="Линейное" className="form__option">
          Линейное
        </option>
        <option value="Площадное" className="form__option">
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
        disabled={isLoading}
        {...register('ownership', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        <option value="" disabled>
          Принадлежность:
        </option>
        <option value="Муниципальное" className="form__option">
          Муниципальное
        </option>
        <option value="Частное" className="form__option">
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
        disabled={isLoading}
        {...register('availability', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        <option value="" disabled>
          Доступность:
        </option>
        <option value="Бесплатное" className="form__option">
          Бесплатное
        </option>
        <option value="Платное" className="form__option">
          Платное
        </option>
        <option value="Условно бесплатное" className="form__option">
          Условно бесплатное
        </option>
      </select>
      <span className={`form__error-message ${errors.availability ? 'form__error-message_active' : ''}`}>
        {errors?.availability?.message}
      </span>
      {watch('availability') === 'Условно бесплатное' && (
        <>
          <input
            type="text"
            className="form__input"
            name="schedule"
            placeholder="Введите график работы"
            disabled={isLoading}
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
      <button type="submit" className="form__submit-btn" disabled={!isValid || isLoading}>
        {isLoading ? 'Сохранение' : 'Сохранить'}
      </button>
    </form>
  );
}

export default ParkingSpaceEditForm;
