import { API } from '@/utils/constants';
import AuthService from './auth.service';
import DoctorService from './doctors.service';

export const authService = new AuthService(API);
export const doctorService = new DoctorService(API);
