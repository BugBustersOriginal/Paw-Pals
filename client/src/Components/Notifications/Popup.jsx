import React from 'react';

export function Popup (props) {

  const onClickFormBox = (event) => {
    event.stopPropagation();
  }

  return (
    <div widgetname="popup-box" className="popup-box" onClick={props.handleClose}>
      <div widgetname="popup-box" className="form-box" onClick={onClickFormBox}>
        {props.content}
      </div>
    </div>
  );
};

