import React, { useState, useEffect } from 'react';
import './clock.css'; // Ensure this imports your CSS file

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  const formatTimeUnit = (unit) => {
    return unit < 10 ? '0' + unit : unit.toString();
  };

  const shouldAnimate = (unit) => {
    // Animate when the last character of the unit is '0' or always for seconds
    return unit.endsWith('0');
  };

  const getPreviousDigit = (currentDigit, key) => {
    if (key.includes('tens')) {
      return currentDigit === '0' ? '5' : (parseInt(currentDigit, 10) - 1).toString();
    } else if (key.includes('hour')) {
      if (key.includes('ones') && hours[0] === '1') {
        return currentDigit === '0' ? '2' : (parseInt(currentDigit, 10) - 1).toString();
      }
      return currentDigit === '0' ? '1' : '0';
    } else {
      return currentDigit === '0' ? '9' : (parseInt(currentDigit, 10) - 1).toString();
    }
  };

  const renderDigit = (currentDigit, isAnimated, key) => {
    // Calculate previous digit with rollover
    const prevDigit = getPreviousDigit(currentDigit, key);
  
    return (
      <div className="digit-container" key={key}>
        {isAnimated && (
          <div className="digit previous">
            {prevDigit}
          </div>
        )}
        <div className="digit current">
          {currentDigit}
        </div>
      </div>
    );
  }

  const hours = formatTimeUnit(time.getHours());
  const minutes = formatTimeUnit(time.getMinutes());
  const seconds = formatTimeUnit(time.getSeconds());

  return (
    <div className="clock">
      {renderDigit(hours[0], shouldAnimate(hours[1]), `hour-tens-${hours[0]})`)}
      {renderDigit(hours[1], shouldAnimate(minutes[0]), `hour-ones-${hours[1]})`)}
      <span>:</span>
      {renderDigit(minutes[0], shouldAnimate(minutes[1]), `minute-tens-${minutes[0]}`)}
      {renderDigit(minutes[1], shouldAnimate(seconds[0]), `minute-ones-${minutes[1]}`)}
      <span>:</span>
      {renderDigit(seconds[0], shouldAnimate(seconds[1]), `second-tens-${seconds[0]}`)} 
      {renderDigit(seconds[1], true, `second-ones-${seconds[1]}`)}
    </div>
  );
}

export default Clock;