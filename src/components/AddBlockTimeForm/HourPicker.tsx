import React, { ChangeEvent } from 'react';

interface HourPickerProps {
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  name: string
  noLabel?: boolean
  interval?: number,
  required?: boolean
}

export default function HourPicker (props : HourPickerProps) {
  const { 
    value, 
    onChange = (e: ChangeEvent<HTMLSelectElement>) => {}, 
    name,
    noLabel = false,
    interval = 60,
    required = false
  } = props

  const generateHourOptions = () => {
    const hours = [];
    const totalMinutesInDay = 24 * 60;

    for (let minutes = 0; minutes < totalMinutesInDay; minutes += interval) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const formattedHour = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      hours.push(formattedHour);
    }

    return hours;
  };

  return (
    <div>
      {
        !noLabel &&
        <label 
          htmlFor="hour-select" 
          className="text-xs"
        >
          Selecciona una hora:
        </label>
      }
      
      <select
        id="hour-select"
        name={name}
        className="border p-1 rounded-md"
        value={value}
        onChange={(e) => onChange(e)}
        required={required}
      >
        {generateHourOptions().map((hour: string, index: number) => (
          <option 
            key={`hourpicker-item-${index}`} 
            value={hour}
          >
            {hour}
          </option>
        ))}
      </select>
    </div>
  )
}