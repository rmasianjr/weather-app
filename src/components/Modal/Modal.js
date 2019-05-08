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
      <div className="modal-container">
        <header className="modal-header">
          <h4>
            {`${content.title}: `}
            <span className="modal-header-message">{warning.message}</span>
          </h4>
        </header>
        <div className="modal-content">
          <p>{content.description}</p>
          {errorType === 'warn' && (
            <span>Note: it will give inaccurate result.</span>
          )}
        </div>
        <button className="modal-button" onClick={() => callback()}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
