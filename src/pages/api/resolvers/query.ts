import { IAppointment } from '@/interfaces/appointments';
import { IDoctors } from '@/interfaces/doctors';
import { IPatient } from '@/interfaces/patients';
import {
  appointmentService,
  authService,
  doctorService,
  patientService,
} from '@/services';
import { parseBearer } from '@/utils/helpers';
import { Context } from '@apollo/client';

export const Query = {
  login: async (_: any, input: { username: any }) => {
    const { username } = input;
    const token = await authService.login(username);

    return {
      token,
    };
  },
  getDoctors: async (parents: any, input: any, context: Context) => {
    const auth = context.req.headers.authorization;

    if (auth) {
      const token = parseBearer(auth);
      const doctors: Array<IDoctors> = await doctorService.search(token);

      return doctors;
    }

    return null;
  },
  getAppointments: async (parents: any, input: any, context: Context) => {
    const auth = context.req.headers.authorization;
    const date = input.date;

    if (auth) {
      const token = parseBearer(auth);
      const appointments: Array<IAppointment> =
        await appointmentService.searchByDate(date, token);

      return appointments;
    }

    return null;
  },
  getPatients: async (parents: any, input: any, context: Context) => {
    const auth = context.req.headers.authorization;

    if (auth) {
      const token = parseBearer(auth);
      const appointments: Array<IPatient> = await patientService.search(token);

      return appointments;
    }

    return null;
  },
};
