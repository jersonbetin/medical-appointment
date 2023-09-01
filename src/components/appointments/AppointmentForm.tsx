import { Dispatch, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import Button from '../commons/Button';
import TimePicker from '../commons/TimePicker';
import { IDoctors } from '@/interfaces/doctors';
import Dropdown from '../commons/Dropdown';
import { DoctorItem, Select } from '../home/AppointmentContent';
import { IPatient } from '@/interfaces/patients';
import { useMutation } from '@apollo/client';
import { CREATE_APPOINTMENT } from '@/graphql/mutations/appointments';

interface AppointmentFormProps {
  doctors?: Array<IDoctors>;
  patients?: Array<IPatient>;
  handleClose: Dispatch<Boolean>;
}

interface DataForm {
  type: string;
  date?: Date;
  time?: string;
}

const formatDate = (date?: Date, time?: string) => {
  return moment(moment(date).format('yyyy-MM-DD') + ' ' + time);
};

const AppointmentForm = ({
  doctors,
  patients,
  handleClose,
}: AppointmentFormProps) => {
  const [currentDoctor, setCurrentDoctor] = useState<IDoctors | null>(null);
  const [currentPatient, setCurrentPatient] = useState<IPatient | null>(null);
  const [dataForm, setDataForm] = useState<DataForm>({
    type: 'remote-consultation',
    date: moment().toDate(),
    time: '1:00 am',
  });
  const [createAppointment, { loading }] = useMutation(CREATE_APPOINTMENT, {
    variables: {
      input: {
        resourceType: 'Appointment',
        resourceData: {
          resourceType: 'Appointment',
          status: 'proposed',
          serviceType: [
            {
              coding: [
                {
                  system: 'http://example.com/telemedicine',
                  code: dataForm.type,
                  display:
                    dataForm.type === 'remote-consultation'
                      ? 'Remote Consultation'
                      : 'virtual Consultation',
                },
              ],
            },
          ],
          start: formatDate(dataForm.date, dataForm.time).toDate(),
          end: formatDate(dataForm.date, dataForm.time)
            .add(30, 'minutes')
            .toDate(),
          participant: [
            {
              actor: {
                reference: `Patient/${currentPatient?.id}`,
              },
              status: 'accepted',
            },
            {
              actor: {
                reference: `Practitioner/${currentDoctor?.id}`,
              },
              status: 'accepted',
            },
          ],
        },
      },
    },
    onCompleted: (data) => {
      const { createAppointment: appointment } = data;
      console.log(appointment);
      handleClose(false);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const onHandleSubmit = () => {
    createAppointment();
  };

  const SelectLabel = () => (
    <div>
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      <span className="ml-2">Seleccionar</span>
    </div>
  );

  const disabled = !currentDoctor || !currentPatient;

  return (
    <div className="card h-full overflow-y-auto">
      <div className="card-title border-b py-5 px-6 leading-7 text-lg font-semibold">
        Nueva Cita
      </div>
      <div className="card-body px-6">
        <div className="w-full h-full">
          <div className="w-full">
            <label
              htmlFor="doctor"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Medico
            </label>
            <Dropdown
              className=""
              tabIndex={0}
              label={
                currentDoctor ? (
                  <Select item={currentDoctor} />
                ) : (
                  <SelectLabel />
                )
              }
            >
              <ul className="menu w-80">
                {doctors?.map((doctor: IDoctors) => (
                  <DoctorItem
                    key={doctor.name}
                    doctor={doctor}
                    onHandleSelect={setCurrentDoctor}
                  />
                ))}
              </ul>
            </Dropdown>
          </div>
          <div className="mt-5">
            <label
              htmlFor="patient"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Paciente
            </label>
            <Dropdown
              tabIndex={-1}
              className=""
              label={
                currentPatient ? (
                  <Select item={currentPatient} />
                ) : (
                  <SelectLabel />
                )
              }
            >
              <ul className="menu w-80">
                {patients?.map((patients: IPatient) => (
                  <DoctorItem
                    key={patients.name}
                    doctor={patients}
                    onHandleSelect={setCurrentPatient}
                  />
                ))}
              </ul>
            </Dropdown>
          </div>
          <div className="w-full mt-5">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de atencion
            </label>
            <select
              className="select select-bordered bg-white w-full"
              value={dataForm.type}
              onChange={onChange}
              name="type"
            >
              <option value="remote-consultation">Cita Presencial</option>
              <option value="virtual-consultation">Cita Virtual</option>
            </select>
          </div>
          <div className="mt-5 w-full grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fecha
              </label>
              <Datepicker
                containerClassName="relative border rounded-lg	"
                primaryColor="red"
                useRange={false}
                asSingle={true}
                value={{
                  startDate: dataForm.date || moment().toDate(),
                  endDate: dataForm.date || moment().toDate(),
                }}
                onChange={(value) => {
                  const newDate = value?.startDate
                    ? moment(value?.startDate).toDate()
                    : undefined;
                  setDataForm({
                    ...dataForm,
                    date: newDate || moment().toDate(),
                  });
                }}
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Hora
              </label>
              <TimePicker
                onHandleChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    time: value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card-actions mt-auto border-t p-4 px-6 justify-between align-self">
        <Button
          label="Cancelar"
          className="btn-outline btn-error border-gray-300 btn-md mr-2"
          onClick={() => handleClose(false)}
        />
        <Button
          label="Confirmar"
          className="btn-md"
          onClick={onHandleSubmit}
          loading={loading}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default AppointmentForm;
