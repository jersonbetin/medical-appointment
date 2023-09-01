import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import moment from 'moment';
// import { GetStaticProps } from 'next';
import Image from 'next/image';

import avatar_women from '@public/Img/doc.webp';
import avatar_men from '@public/Img/doc_men.jpeg';
import Button from '@/components/commons/Button';
import Dropdown from '@/components/commons/Dropdown';
import { IDoctors } from '@/interfaces/doctors';
import React, { Dispatch, useEffect, useState } from 'react';
import { IAppointment } from '@/interfaces/appointments';
import AppointmentList from './AppointmentList';
import { IPatient } from '@/interfaces/patients';
import { useLazyQuery } from '@apollo/client';
import { GET_APPOINTMENTS } from '@/graphql/queries/appointments';

interface AppointmentContentProps {
  doctors?: Array<IDoctors>;
  appointments?: Array<IAppointment>;
  patients?: Array<IPatient>;
  setAppointments: Dispatch<Array<IAppointment>>;
}

export const Select = ({ item }: { item: IDoctors | null }) => {
  const avatar = item?.gender === 'male' ? avatar_men : avatar_women;
  return (
    <div className="flex items-center ml-2">
      <div className="avatar">
        <div className="w-6 rounded-full">
          <Image src={avatar} alt="avatar/select" />
        </div>
      </div>
      <span className="ml-2 font-medium leading-6 text-base">{item?.name}</span>
    </div>
  );
};

export const DoctorItem = ({
  doctor,
  onHandleSelect,
}: {
  doctor: IDoctors | IPatient;
  onHandleSelect: Dispatch<IDoctors> | Dispatch<IPatient>;
}) => {
  const avatar = doctor.gender === 'male' ? avatar_men : avatar_women;

  return (
    <li
      onClick={() => {
        onHandleSelect(doctor);
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

const AppointmentContent = ({
  doctors = [],
  appointments = [],
  patients = [],
  setAppointments,
}: AppointmentContentProps) => {
  const [select, setSelect] = useState<IDoctors | null>(doctors[0]);
  const [currentDate, setCurrentDate] = useState<Date>(moment().toDate());
  const [getAppointments] = useLazyQuery(GET_APPOINTMENTS, {
    variables: { date: moment(currentDate).format('yyyy-MM-DD') },
    onCompleted: (data) => {
      const { getAppointments: appointments } = data;
      const result = appointments.filter(
        (appoint: IAppointment) => appoint.doctorId === select?.id,
      );
      setAppointments(result);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    getAppointments();
  }, [currentDate, select]);

  return (
    <div className="card w-100 bg-white drop-shadow">
      <div className="card-title p-4 border-b justify-between">
        <div className="flex items-center">
          <Button
            onClick={() => setCurrentDate(moment().toDate())}
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
                startDate: currentDate,
                endDate: currentDate,
              }}
              onChange={(value: DateValueType) => {
                setCurrentDate(moment(value?.startDate).toDate());
              }}
            />
          </div>
        </div>
        <div className="flex items-center">
          <span className="font-medium leading-6 text-base mr-2">
            Agenda del medico:
          </span>
          <Dropdown tabIndex={0} label={<Select item={select} />}>
            <ul className="menu w-80">
              {doctors.map((doctor: IDoctors) => (
                <DoctorItem
                  key={doctor.name}
                  doctor={doctor}
                  onHandleSelect={setSelect}
                />
              ))}
            </ul>
          </Dropdown>
        </div>
      </div>
      <div className="card-body px-0">
        {appointments?.length === 0 ? (
          <div className="flex flex-col  items-center text-center">
            <p className="text-base leading-6 font-semibold">
              No se encontraron registros
            </p>
            <p className="text-gray-600 font-normal text-sm max-w-xs">
              El médico seleccionado no tiene ninguna cita el día de hoy.
            </p>
          </div>
        ) : (
          <AppointmentList patients={patients} appointments={appointments} />
        )}
      </div>
    </div>
  );
};

export default AppointmentContent;
