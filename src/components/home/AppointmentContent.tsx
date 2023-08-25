import Datepicker from 'react-tailwindcss-datepicker';
import moment from 'moment';
import Image from 'next/image';

import Button from '../commons/Button';
import Dropdown from '../commons/Dropdown';
import avatar from '@public/Img/doc.webp';

const AppointmentContent = () => {
  const Select = () => {
    const item = {
      url: avatar,
      name: 'Pedro Perez',
    };
    return (
      <div className="flex items-center ml-2">
        <div className="avatar">
          <div className="w-6 rounded-full">
            <Image src={item.url} alt="avatar/select" />
          </div>
        </div>
        <span className="ml-2 font-medium leading-6 text-base">
          {item.name}
        </span>
      </div>
    );
  };

  return (
    <div className="card w-100 bg-white drop-shadow">
      <div className="card-title p-4 border-b justify-between">
        <div className="flex items-center">
          <Button
            onClick={() => console.log()}
            label="Hoy"
            className="btn-sm btn-outline "
          />
          <div className="divider divider-horizontal" />
          <div className="relative max-w-sm">
            <Datepicker
              containerClassName="relative border rounded-lg	"
              primaryColor="red"
              useRange={false}
              asSingle={true}
              value={{
                startDate: moment().toDate(),
                endDate: moment().toDate(),
              }}
              onChange={(e) => console.log(e)}
              maxDate={moment().toDate()}
            />
          </div>
        </div>
        <div className="flex items-center">
          <span className="font-medium leading-6 text-base mr-2">
            Agenda del medico:
          </span>
          <Dropdown tabIndex={0} label={<Select />}>
            <ul className="menu">
              <li>
                <span>Item 1</span>
              </li>
              <li>
                <span>Item 2</span>
              </li>
            </ul>
          </Dropdown>
        </div>
      </div>
      <div className="card-body">
        <div className="flex flex-col  items-center text-center">
          <p className="text-base leading-6 font-semibold">
            No se encontraron registros
          </p>
          <p className="text-gray-600 font-normal text-sm max-w-xs">
            El médico seleccionado no tiene ninguna cita el día de hoy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentContent;
