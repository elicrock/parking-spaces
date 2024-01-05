import './CreateParkingSpaceForm.css';
import { useForm, Controller } from 'react-hook-form';

function CreateParkingSpaceForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    clearErrors,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: 'all' });

  const handleClose = () => {
    clearErrors(['name', 'email', 'question', 'agree']);
    setIsSubmitError('');
    onClose();
  };

  return (
    <form className="form">
      <input type="text" className="form__input" name="name" placeholder="Введите название парковочного пространства" />
      <input type="text" className="form__input" name="address" placeholder="Введите адрес парковочного пространства" />
      <div className="form__coordinates">
        <p className="form__coordinates-title">Координаты</p>
        <div className="form__coordinates-latitude">
          Широта: <span>данные широты</span>
        </div>
        <div className="form__coordinates-longitude">
          Долгота: <span>данные долготы</span>
        </div>
      </div>
      <input type="number" className="form__input" name="maxPlaces" min="0" placeholder="Введите количество мест" />
      <select name="locationType" className="form__select" defaultValue="">
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
      <select name="ownership" className="form__select" defaultValue="">
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
      <select name="availability" className="form__select" defaultValue="">
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
      <input type="text" className="form__input" name="schedule" placeholder="Введите график работы" />
      {/* {formData.availability === 'conditionalFree' && (
        
      )} */}
      <button type="submit" className="form__submit-btn">
        Создать
      </button>
    </form>
  );
}

export default CreateParkingSpaceForm;
