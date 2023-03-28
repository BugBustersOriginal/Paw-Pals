import React, {useState, useEffect, useRef, useCallback} from 'react';


export default function DateSplitter (props) {
  function checkIfToday(date) {
    const todayDate = new Date();
    return (
      date.getFullYear() === todayDate.getFullYear() &&
      date.getMonth() === todayDate.getMonth() &&
      date.getDate() === todayDate.getDate()
    );
  }
  function formatDate(date) {
    if (checkIfToday(props.date)) {
      return 'Today'
    }
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
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
