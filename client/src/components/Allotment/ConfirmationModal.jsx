import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ allotments, updateAllotments, setShowModal }) => {
  const confirmAllotment = () => {
    updateAllotments(allotments);
    setShowModal(false);
  };

  const cancelAllotment = () => {
    setShowModal(false);
  };

  return (
    <div className="confirmation-modal-container">
      <div className="confirmation-modal">
        {/* <h1>End Allotment Round?</h1> */}
        <h4>Are you sure you want to confirm the allotment?</h4>
        <p>The allotment round will end and further changes can't be made</p>

        <div className="confirmation-modal-buttons">
          <button
            className="confirmation-modal-confirm-button"
            onClick={confirmAllotment}
          >
            Confirm
          </button>
          <button
            className="confirmation-modal-cancel-button"
            onClick={cancelAllotment}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
