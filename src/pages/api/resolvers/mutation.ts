import { AppointmentInput } from '@/interfaces/appointments';
import { appointmentService } from '@/services';
import { parseBearer } from '@/utils/helpers';
import { Context } from '@apollo/client';

export const Mutation = {
  createAppointment: async (
    _: any,
    { input }: { input: AppointmentInput },
    context: Context,
  ) => {
    const auth = context.req.headers.authorization;
    if (auth) {
      const token = parseBearer(auth);
      const appointment = await appointmentService.create(
        JSON.parse(JSON.stringify(input)),
        token,
      );

      return appointment;
    }
    return null;
  },
};
