import React from 'react';
import '../css/ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>Are you sure you want to admit this patient?</p>
                <button onClick={onConfirm}>Confirm Admission</button>
                <button onClick={onClose} className="button-cancel">Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
