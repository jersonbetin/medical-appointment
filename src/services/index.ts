import { API } from '@/utils/constants';
import AuthService from './auth.service';
import DoctorService from './doctors.service';
import AppointmentService from './appointment.service';
import PatientService from './patients.service';

export const authService = new AuthService(API);
export const doctorService = new DoctorService(API);
export const appointmentService = new AppointmentService(API);
export const patientService = new PatientService(API);
