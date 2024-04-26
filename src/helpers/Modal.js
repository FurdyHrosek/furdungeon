/**
 * Removes all overlay elements from the DOM.
 */
export const removeOverlay = () => {
  const overlays = document.querySelectorAll('.overlay');
  if (overlays) {
    overlays.forEach(overlay => overlay.remove());
  }
}

/**
 * Creates functions to manage modal visibility.
 * @param {Object} data - The data object from Vue component.
 * @param {boolean} isModalVisible - Flag indicating if the modal is visible or not.
 * @returns {Object} An object containing functions to open, close, and toggle the modal.
 */
export const createModalFunctions = (data, isModalVisible) => {
  const openModal = (event) => {
    const overlay = document.createElement('div');
    const overlayClass = event.target.dataset.open + '-overlay';
    overlay.classList.add('overlay', overlayClass);
    document.body.insertBefore(overlay, document.body.firstChild);

    data[isModalVisible] = true;

    const closeModalOnEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', closeModalOnEscape);
  };

  
  const closeModal = () => {
    removeOverlay();
    data[isModalVisible] = false;
  };


  const toggleModal = (event) => {
    if (data[isModalVisible]) {
      closeModal();
    } else {
      openModal(event);
    }
  };

  return { openModal, closeModal, toggleModal };
};