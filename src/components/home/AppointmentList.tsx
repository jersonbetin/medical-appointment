import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';

import { IAppointment } from '@/interfaces/appointments';
import { IPatient } from '@/interfaces/patients';
import Avatar from '../commons/Avatar';
import Button from '../commons/Button';

interface IAppointmentListProps {
  appointments?: Array<IAppointment>;
  patients?: Array<IPatient>;
}

const AppointmentList = ({ appointments, patients }: IAppointmentListProps) => {
  return (
    <div>
      {appointments?.map((appoint: IAppointment) => {
        const {
          id,
          patientId,
          type,
          date: { start, end },
        } = appoint;
        const patient = patients?.find((patient) => patient.id === patientId);

        return (
          <div key={id} className="p-4 flex align-content justify-between">
            <div className="flex ">
              <Avatar name={patient?.name || ''} />
              <div className="ml-4">
                <p className="text-sm font-medium leading-5 capitalize">
                  {patient?.name || ''}
                </p>
                <p className="text-xs">
                  {`${patient?.gender || ''} - ${moment().diff(
                    patient?.birthDate || '',
                    'years',
                    false,
                  )} años`}
                </p>
                <div className="flex mt-2 items-center text-xs divide-x">
                  <div className="flex items-center mr-2">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-base text-gray-300"
                    />
                    <span className="ml-2">
                      {`${moment(start || '').format('h:mm a')} - ${moment(
                        end || '',
                      ).format('h:mm a')}`}
                    </span>
                  </div>
                  <span className="flex items-center pl-2">
                    <span className="bg-gray-100 px-2 py-1 rounded-lg">
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="text-base text-gray-300 pr-2"
                      />
                      {type}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Button
                label="Editar"
                className="btn-ghost border border-gray-300 btn-sm mr-2"
                onClick={() => console.log('editar')}
              />
              <Button
                label="Eliminar"
                className="btn-outline btn-error bg-red-50 border border-gray-300 btn-sm mr-2"
                onClick={() => console.log('editar')}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentList;
