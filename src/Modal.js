import React, { useEffect } from 'react';
import Button from './components/Button';
import './Modal.css';

const Modal = React.memo(function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <Button 
            variant="outline"
            size="small"
            className="modal-close-button" 
            onClick={onClose}
            ariaLabel="モーダルを閉じる"
          >
            ×
          </Button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
});

export default Modal;