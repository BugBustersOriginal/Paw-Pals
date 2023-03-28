import React, {useState, useEffect, useRef, useCallback} from 'react';


export default function DateSplitter (props) {
  function formatDate(date) {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  const formattedDate = formatDate(props.date);
  return (
    <div className="message-date-separator">
      <div className="line"></div>
      <div className="date">{formattedDate}</div>
      <div className="line"></div>
    </div>
  )
}
