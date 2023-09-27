'use client' 
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  date: string;
}
function CountdownTimer({date}: CountdownTimerProps) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const targetDate: any = new Date(date);
      const currentDate: any = new Date();
      const timeRemaining = Math.max(targetDate - currentDate, 0);

      setDays(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((timeRemaining % (1000 * 60)) / 1000));
    };

    calculateTimeRemaining(); // Initial calculation

    const interval = setInterval(() => {
      calculateTimeRemaining(); // Recalculate every second
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="border text-center">
        <p className="text-5xl text-gray-600 px-10 py-5">{days}</p>
        <hr />
        <p className="px-10 py-5 text-gray-600">days</p>
      </div>

      <div className="border text-center">
        <p className="text-5xl text-gray-600 px-10 py-5">{String(hours).padStart(2, '0')}</p>
        <hr />
        <p className="px-10 py-5 text-gray-600">hours</p>
      </div>

      <div className="border text-center">
        <p className="text-5xl text-gray-600 px-10 py-5">{String(minutes).padStart(2, '0')}</p>
        <hr />
        <p className="px-10 py-5 text-gray-600">mins</p>
      </div>

      <div className="border text-center">
        <p className="text-5xl text-gray-600 px-10 py-5">{String(seconds).padStart(2, '0')}</p>
        <hr />
        <p className="px-10 py-5 text-gray-600">secs</p>
      </div>
    </>
  );
}

export default CountdownTimer;
  