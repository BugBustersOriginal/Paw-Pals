import React, {useState, useEffect, useRef, useCallback} from 'react';
import axios from 'axios';

export default function DateSplitter (props) {
  function checkIfToday(date) {
    const todayDate = new Date();
    return (
      date.getFullYear() === todayDate.getFullYear() &&
      date.getMonth() === todayDate.getMonth() &&
      date.getDate() === todayDate.getDate()
    );
  }
  useEffect(() => {
    axios.post(`http://localhost:1234/test`, { viewed: true })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, [])
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
      <div className="date">{formattedDate}</div>
    </div>
  )
}
