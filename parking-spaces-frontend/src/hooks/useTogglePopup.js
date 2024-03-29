import { useState, useEffect, useCallback } from 'react';

function useTogglePopup() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = useCallback(type => {
    setShowModal(true);
    setModalType(type);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleEscClose = useCallback(
    evt => {
      if (evt.key === 'Escape') {
        handleCloseModal();
      }
    },
    [handleCloseModal],
  );

  const handleCloseOverlayClick = useCallback(
    evt => {
      const target = evt.target;
      if (target.classList.contains('modal__content')) {
        handleCloseModal();
      }
    },
    [handleCloseModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mousedown', handleCloseOverlayClick);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleCloseOverlayClick);
    };
  }, [handleCloseOverlayClick, handleEscClose]);

  return { showModal, modalType, setShowModal, handleOpenModal, handleCloseModal };
}

export default useTogglePopup;
