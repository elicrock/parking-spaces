import useTogglePopup from '../../hooks/useTogglePopup';
import Modal from '../Modal/Modal';
import './CreateParkingSpace.css';
import CreateParkingSpaceForm from './CreateParkingSpaceForm/CreateParkingSpaceForm';

function CreateParkingSpace() {
  const { showModal, handleCloseModal, handleOpenModal } = useTogglePopup();
  return (
    <>
      <button onClick={handleOpenModal} className="parking__add-btn">
        Создать парковочное пространство
      </button>
      <Modal
        titleModal="Создание парковочного пространства"
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
      >
        <CreateParkingSpaceForm onClose={handleCloseModal} />
      </Modal>
    </>
  );
}

export default CreateParkingSpace;
