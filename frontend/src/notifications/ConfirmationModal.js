import React from 'react';
import '../css/ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message, confirmButtonText, cancelButtonText }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <button onClick={onConfirm}>{confirmButtonText}</button>
                <button onClick={onClose} className="button-cancel">{cancelButtonText}</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
