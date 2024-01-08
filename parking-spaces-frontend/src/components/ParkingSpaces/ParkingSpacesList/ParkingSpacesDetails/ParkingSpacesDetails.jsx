import './ParkingSpacesDetails.css';
import { useDeleteParkingByIdMutation } from '../../../../Api/pakingSpacesApi';
import useTogglePopup from '../../../../hooks/useTogglePopup';
import Modal from '../../../Modal/Modal';
import ParkingSpaceEditForm from '../ParkingSpaceEditForm/ParkingSpaceEditForm';

function ParkingSpacesDetails({ parkingSpace, setSelectedSpace }) {
  const [deleteParkingById, { isLoading: isDeleting }] = useDeleteParkingByIdMutation();
  const { showModal, modalType, handleCloseModal, handleOpenModal } = useTogglePopup();

  const handleEditClick = () => {
    handleOpenModal('edit');
  };

  const handleDeleteClick = () => {
    handleOpenModal('delete');
  };

  const handleConfirmDeleteClick = async () => {
    try {
      await deleteParkingById(parkingSpace._id).unwrap();
      setSelectedSpace(null);
      handleCloseModal();
    } catch (error) {
      console.error('Произошла ошибка при удалении парковочного пространства', error);
    }
  };

  return (
    <div className="parking-spaces__details">
      {parkingSpace ? (
        <>
          <h3 className="parking-spaces__details-title">{parkingSpace.name}</h3>
          <p className="parking-spaces__details-text">
            Адрес: <span>{parkingSpace.address}</span>
          </p>
          <div className="parking-spaces__details-coordinates">
            <p className="parking-spaces__details-text">
              Широта: <span>{parkingSpace.latitude}</span>
            </p>
            <p className="parking-spaces__details-text">
              Долгота: <span>{parkingSpace.longitude}</span>
            </p>
          </div>
          <p className="parking-spaces__details-text">
            Максимальное количество мест: <span>{parkingSpace.maxPlaces}</span>
          </p>
          <p className="parking-spaces__details-text">
            Тип расположения: <span>{parkingSpace.locationType}</span>
          </p>
          <p className="parking-spaces__details-text">
            Принадлежность: <span>{parkingSpace.ownership}</span>
          </p>
          <p className="parking-spaces__details-text">
            Доступность: <span>{parkingSpace.availability}</span>
          </p>
          {parkingSpace.availability === 'Условно бесплатное' && (
            <p className="parking-spaces__details-text">
              График работы: <span>{parkingSpace.schedule}</span>
            </p>
          )}
          <div className="parking-spaces__details-buttons">
            <button type="button" className="parking-spaces__edit-btn" onClick={handleEditClick}>
              Редактировать
            </button>
            <button
              type="button"
              className="parking-spaces__delete-btn"
              onClick={handleDeleteClick}
              disabled={isDeleting}
            >
              Удалить
            </button>
          </div>
          <Modal
            titleModal="Вы уверены, что хотите удалить парковочное пространство?"
            showModal={showModal && modalType === 'delete'}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
          >
            <div className="parking-spaces__details-buttons">
              <button type="button" className="parking-spaces__delete-btn" onClick={handleConfirmDeleteClick}>
                Да
              </button>
              <button type="button" className="parking-spaces__cancel-btn" onClick={handleCloseModal}>
                Нет
              </button>
            </div>
          </Modal>
          <Modal
            titleModal="Редактировать парковочное пространство"
            showModal={showModal && modalType === 'edit'}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleEditClick}
          >
            <ParkingSpaceEditForm
              parkingSpace={parkingSpace}
              onClose={handleCloseModal}
              setSelectedSpace={setSelectedSpace}
            />
          </Modal>
        </>
      ) : (
        <p className="parking-spaces__details-text">Выберите парковочное пространство</p>
      )}
    </div>
  );
}

export default ParkingSpacesDetails;
