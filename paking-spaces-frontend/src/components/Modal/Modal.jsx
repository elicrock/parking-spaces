import { createPortal } from 'react-dom';
import './Modal.css';
import ModalContent from './ModalContent/ModalContent';

function Modal({ titleModal, classModal, children, showModal, handleCloseModal }) {
  return (
    <>
      {showModal &&
        createPortal(
          <ModalContent
            children={children}
            onClose={handleCloseModal}
            titleModal={titleModal}
            classModal={classModal}
          />,
          document.getElementById('modal'),
        )}
    </>
  );
}

export default Modal;
