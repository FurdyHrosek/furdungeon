export const removeOverlay = () => {
  const overlays = document.querySelectorAll('.overlay');
  if (overlays) {
      overlays.forEach(overlay => overlay.remove());
  }
}

export const createModalFunctions = (data, isVisibleState) => {
  const openModal = () => {
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      document.body.insertBefore(overlay, document.body.firstChild);

      data[isVisibleState] = true;

      const closeModalOnEscape = (event) => {
        if (event.key === 'Escape') {
          closeModal();
        }
      };
  
      document.addEventListener('keydown', closeModalOnEscape);
  };
  
  const closeModal = () => {
    removeOverlay();
    data[isVisibleState] = false;
  };
  
  return { openModal, closeModal };
};