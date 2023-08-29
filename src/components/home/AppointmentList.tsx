import { IAppointment } from '@/interfaces/appointments';

interface IAppointmentListProps {
  // doctors?: Array<IDoctors>;
  appointments?: Array<IAppointment>;
  patients?: Array<any>;
}

const AppointmentList = ({ appointments, patients }: IAppointmentListProps) => {
  console.log(appointments, patients);
  return <>test</>;
};

export default AppointmentList;
