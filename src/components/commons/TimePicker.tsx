import { ChangeEvent, useState } from 'react';

const initialTime = {
  hours: '1',
  minutes: '00',
  meridiem: 'am',
};

interface TimePickerProps {
  // eslint-disable-next-line no-unused-vars
  onHandleChange: (date: string) => void;
}

const TimePicker = ({ onHandleChange }: TimePickerProps) => {
  const [time, setTime] = useState<typeof initialTime>(initialTime);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newTime = { ...time, [name]: value };
    const timeClone = `${newTime.hours}:${newTime.minutes} ${newTime.meridiem}`;

    onHandleChange(timeClone);
    setTime(newTime);
  };

  return (
    <div className="px-5 py-2 w-40 bg-white rounded-lg border">
      <div className="flex">
        <select
          value={time.hours}
          onChange={onChange}
          name="hours"
          className="bg-transparent text-base appearance-none outline-none"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <span className="text-base mr-3">:</span>
        <select
          value={time.minutes}
          onChange={onChange}
          name="minutes"
          className="bg-transparent text-base appearance-none outline-none mr-4"
        >
          <option value="0">00</option>
          <option value="30">30</option>
        </select>
        <select
          value={time.meridiem}
          onChange={onChange}
          name="meridiem"
          className="bg-transparent text-base appearance-none outline-none"
        >
          <option value="am">AM</option>
          <option value="pm">PM</option>
        </select>
      </div>
    </div>
  );
};

export default TimePicker;
