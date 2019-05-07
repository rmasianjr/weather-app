import React from 'react';

import './Modal.css';

const Modal = ({ warning, runFallback }) => (
  <div className="modal">
    <div className="modal-container">
      <header className="modal-header">
        <h4>
          Warning:{' '}
          <span className="modal-header-message">{warning.message}</span>
        </h4>
      </header>
      <div className="modal-content">
        <p>
          As a fallback, it will use the user <strong>IP Address</strong> to get
          the location and weather status.
        </p>
        <span>Note: it will give inaccurate result.</span>
      </div>
      <button className="modal-button" onClick={() => runFallback()}>
        Ok
      </button>
    </div>
  </div>
);

export default Modal;
