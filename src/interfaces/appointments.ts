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

export interface Coding {
  system?: string;
  code?: string;
  display?: string;
}

export interface ObjectCoding {
  coding?: [Coding];
}

export interface Participant {
  actor: {
    reference?: string;
  };
  status?: string;
}

export interface ResourceData {
  resourceType?: string;
  status?: string;
  serviceType?: [ObjectCoding];
  start: Date;
  end: Date;
  participant: [Participant];
}

export interface AppointmentInput {
  resourceType: String;
  resourceData: ResourceData;
}
