import './CreateParkingSpace.css';
import useTogglePopup from '../../hooks/useTogglePopup';
import Modal from '../Modal/Modal';
import CreateParkingSpaceForm from './CreateParkingSpaceForm/CreateParkingSpaceForm';

function CreateParkingSpace({ setSelectedSpace }) {
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
        <CreateParkingSpaceForm onClose={handleCloseModal} setSelectedSpace={setSelectedSpace} />
      </Modal>
    </>
  );
}

export default CreateParkingSpace;
