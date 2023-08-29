import { appointmentService, authService, doctorService } from '@/services';
import { parseBearer } from '@/utils/helpers';
import { Context } from '@apollo/client';

export const Query = {
  login: async (_: any, input: { username: any }) => {
    const { username } = input;
    console.log(input);
    const token = await authService.login(username);
    console.log(token);
    return {
      token,
    };
  },
  getDoctors: async (parents: any, input: any, context: Context) => {
    const auth = context.req.headers.authorization;

    if (auth) {
      const token = parseBearer(auth);
      const doctors = await doctorService.search(token);
      console.log(doctors.map((doc) => doc));
      return doctors;
    }

    return null;
  },
  getAppointments: async (parents: any, input: any, context: Context) => {
    const auth = context.req.headers.authorization;
    const date = input.date;
    console.log(date);

    if (auth) {
      const token = parseBearer(auth);
      const appointments = await appointmentService.searchByDate(date, token);
      console.log(appointments);
      return appointments;
    }

    return null;
  },
};
