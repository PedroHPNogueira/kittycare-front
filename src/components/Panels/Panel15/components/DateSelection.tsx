import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Tip from '../../Tip';

const DateSelection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const storedDate = localStorage.getItem('selected_date');
    if (storedDate) {
      setSelectedDate(new Date(storedDate));
    }
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      localStorage.setItem('selected_date', date.toString());
    } else {
      localStorage.removeItem('selected_date');
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg rounded-lg p-6 font-inter">
      <h2 className="mb-4 text-center text-[20px] font-semibold">
        Training Schedule
      </h2>
      <div className="mx-auto w-full max-w-lg rounded-lg border border-pearlBush bg-lightPearl p-6 font-inter">
        {/* Header */}
        <div className="mb-6 flex items-center justify-center px-4 py-2 text-center">
          <h1 className="w-max rounded-xl bg-lightGray px-4 py-2 font-inter text-[20px] font-semibold leading-[28px] text-black">
            Training Plan
          </h1>
        </div>
        {/* Inline Date Picker */}
        <div className="mb-6 flex justify-center">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            calendarClassName="custom-calendar"
            dayClassName={() =>
              'rounded-full hover:bg-orange-200 focus:bg-orange-500'
            }
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <h3 className="text-sm font-bold text-black">You have selected</h3>
          <div>
            {JSON.parse(localStorage.getItem('training_days') || '[]').map(
              (item: string) => (
                <span
                  className="mx-1 rounded-md bg-primaryBlue px-3 py-1 text-xs font-bold text-white"
                  key={item}
                >
                  {item}
                </span>
              ),
            )}
          </div>
          <h3 className="text-sm font-bold text-black">As training days.</h3>
        </div>
      </div>
      <Tip text="We’ll send you reminders on your selected training days to keep you and your cat on track!" />
    </div>
  );
};

export default DateSelection;
