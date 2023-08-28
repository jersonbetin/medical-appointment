import Datepicker from 'react-tailwindcss-datepicker';
import moment from 'moment';
// import { GetStaticProps } from 'next';
import Image from 'next/image';

import avatar_women from '@public/Img/doc.webp';
import avatar_men from '@public/Img/doc_men.jpeg';
import Button from '@/components/commons/Button';
import Dropdown from '@/components/commons/Dropdown';
import { IDoctors } from '@/interfaces/doctors';
import { useState } from 'react';

interface AppointmentContentProps {
  doctors?: Array<IDoctors>;
}

const AppointmentContent = ({ doctors = [] }: AppointmentContentProps) => {
  const [select, setSelect] = useState<IDoctors | null>(doctors[0]);

  const Select = () => {
    const avatar = select?.gender === 'male' ? avatar_men : avatar_women;
    return (
      <div className="flex items-center ml-2">
        <div className="avatar">
          <div className="w-6 rounded-full">
            <Image src={avatar} alt="avatar/select" />
          </div>
        </div>
        <span className="ml-2 font-medium leading-6 text-base">
          {select?.name}
        </span>
      </div>
    );
  };

  const DoctorItem = ({ doctor }: { doctor: IDoctors }) => {
    const avatar = doctor.gender === 'male' ? avatar_men : avatar_women;

    return (
      <li
        onClick={() => {
          setSelect(doctor);
        }}
        aria-hidden="true"
      >
        <div className="flex items-center ml-2">
          <div className="avatar">
            <div className="w-6 rounded-full">
              <Image src={avatar} alt="avatar/select" />
            </div>
          </div>
          <span className="ml-2 font-medium leading-6 text-base">
            {doctor.name}
          </span>
        </div>
      </li>
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
            <ul className="menu w-80">
              {doctors.map((doctor: IDoctors) => (
                <DoctorItem key={doctor.name} doctor={doctor} />
              ))}
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
