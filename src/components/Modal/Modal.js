import React from 'react';

import './Modal.css';

const Modal = ({ warning, runFallback, errorType, runTryAgain }) => {
  const callback = errorType === 'fetch-geo' ? runTryAgain : runFallback;

  const warnContent = {
    title: 'Warning',
    description: (
      <p>
        As a fallback, it will use the user <strong>IP Address</strong> to get
        the location and weather status.
      </p>
    )
  };

  const errorContent = {
    title: 'Error',
    description: <p>Please Try Again.</p>
  };

  const content = errorType === 'warn' ? warnContent : errorContent;

  return (
    <div className="modal">
      <div
        className={`modal-container ${
          errorType === 'warn'
            ? 'modal-container-warn'
            : 'modal-container-danger'
        }`}
      >
        <header
          className={`modal-header ${
            errorType === 'warn' ? 'modal-header-warn' : 'modal-header-danger'
          }`}
        >
          <h4>
            {`${content.title}: `}
            <span className="modal-header-message">{warning.message}</span>
          </h4>
        </header>
        <div
          className={`modal-content ${
            errorType === 'warn' ? 'modal-content-warn' : 'modal-content-danger'
          }`}
        >
          <p>{content.description}</p>
          {errorType === 'warn' && (
            <span>Note: it will give inaccurate result.</span>
          )}
        </div>
        <button
          className={`modal-button ${
            errorType === 'warn' ? 'modal-button-warn' : 'modal-button-danger'
          }`}
          onClick={() => callback()}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
