import { IDoctors } from './doctors';

interface RangeDate {
  start: string;
  end: string;
}

export interface IAppointment {
  date: RangeDate;
  id: string;
  doctorId?: string;
  patientId?: string;
  patient?: any;
  doctor?: IDoctors;
  type: string;
}
