import { differenceInSeconds } from 'date-fns';
import { useEffect } from 'react';
import { useState } from 'react';


const CountdownTimer = ({ targetDate }) => {
    const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [eventStarted, setEventStarted] = useState(false);
  
    useEffect(() => {
      const calculateTimeRemaining = () => {
        const now = new Date();
        const secondsRemaining = differenceInSeconds(targetDate, now);
  
        if (secondsRemaining > 0) {
          const hours = Math.floor(secondsRemaining / 3600);
          const minutes = Math.floor((secondsRemaining % 3600) / 60);
          const seconds = secondsRemaining % 60;
  
          setTimeRemaining({ hours, minutes, seconds });
        } else {
          setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
          setEventStarted(true);
        }
      };
  
      calculateTimeRemaining();
      const interval = setInterval(calculateTimeRemaining, 1000);
      return () => clearInterval(interval);
    }, [targetDate]);
  
    if (eventStarted) {
      return <></>;
    }
  
    const timeParts = [
      { value: timeRemaining.hours, label: 'Hours' },
      { value: timeRemaining.minutes, label: 'Minutes' },
      { value: timeRemaining.seconds, label: 'Seconds' },
    ];
  
    return (
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Event starts in:</h3>
        <div className="flex justify-center space-x-2">
          {timeParts.map((part, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-gray-800 p-2 rounded-md shadow-lg">
                <span className="text-white text-2xl font-bold">{part.value.toString().padStart(2, '0')}</span>
              </div>
              <span className="text-gray-600 mt-1">{part.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default CountdownTimer;