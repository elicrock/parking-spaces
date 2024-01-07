import './ModalContent.css';

function ModalContent({ children, onClose, titleModal, classModal }) {
  return (
    <div className={`modal__content ${classModal ? classModal : ''}`}>
      <div className="modal__container">
        <button className="modal__close-btn" type="button" onClick={onClose}></button>
        <h2 className="modal__title">{titleModal}</h2>
        {children}
      </div>
    </div>
  );
}

export default ModalContent;
