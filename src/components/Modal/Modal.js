import React from 'react';

import './Modal.css';

const Modal = ({ error, runFallback, runTryAgain }) => {
  const { errorContent, type } = error;

  const funcToRun = type !== 'warn' ? runTryAgain : runFallback;

  const warnObj = {
    title: 'Warning',
    description: (
      <p>
        As a fallback, it will use the user <strong>IP Address</strong> to get
        the location and weather status.
      </p>
    ),
    style: 'warn'
  };

  const errorObj = {
    title: 'Error',
    description: <p>{errorContent.message}</p>,
    style: 'danger'
  };

  const content = type === 'warn' ? warnObj : errorObj;

  return (
    <div className="modal">
      <div className={`modal-container modal-container-${content.style}`}>
        <header className={`modal-header modal-header-${content.style}`}>
          <h4>
            {content.title}:{' '}
            {type === 'warn' && (
              <span className="modal-header-message">
                {errorContent.message}
              </span>
            )}
          </h4>
        </header>
        <div className={`modal-content modal-content-${content.style}`}>
          {content.description}
          {type === 'warn' && (
            <span>Note: it will give inaccurate result.</span>
          )}
        </div>
        <button
          className={`modal-button modal-button-${content.style}`}
          onClick={funcToRun}
        >
          {type === 'warn' ? 'Ok' : 'Try Again'}
        </button>
      </div>
    </div>
  );
};

export default Modal;
