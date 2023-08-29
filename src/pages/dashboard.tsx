import Button from '@/components/commons/Button';
import AppointmentContent from '@/components/home/AppointmentContent';
import { appointmentService, doctorService, patientService } from '@/services';
import { GetServerSideProps } from 'next';
import * as cookie from 'cookie';
import { TOKEN } from '@/utils/constants';
import { IDoctors } from '@/interfaces/doctors';
import { IAppointment } from '@/interfaces/appointments';
import Cookies from 'js-cookie';
import { IncomingHttpHeaders } from 'http';
// import moment from 'moment';

function getTokenFromCookie(headers: IncomingHttpHeaders) {
  const cookies = cookie.parse(headers.cookie as string);
  const token = cookies[TOKEN];
  return token;
}

export const getServerSideProps: GetServerSideProps<{
  doctors: any;
}> = async (context) => {
  const token = getTokenFromCookie(context.req.headers);

  console.log('TOKENNNNNN', token);

  try {
    const doctors: Array<IDoctors> = await doctorService.search(token);
    const patients: Array<any> = await patientService.search(token);
    const appointments: Array<IAppointment> =
      await appointmentService.searchByDate(
        // moment().format('YYYY-MM-DD'),
        '2023-09-01',
        token,
      );

    return { props: { doctors, error: null, appointments, patients } };
  } catch (e) {
    return {
      props: {
        error: JSON.stringify(e),
        doctors: [],
        appointments: [],
        patients: [],
      },
    };
  }
};

export default function Home({
  doctors,
  appointments,
  patients,
}: {
  doctors: Array<IDoctors>;
  patients: Array<any>;
  appointments: Array<any>;
}) {
  console.log('cliente', Cookies.get(TOKEN));

  return (
    <main className="border-1 w-full h-full bg-gray-50 text-black p-8">
      <section className="flex justify-between">
        <div className="">
          <h3 className="text-3xl font-semibold leading-9">Agenda</h3>
          <p className="text-gray-600 font-normal	leading-6">
            Manage your team members and their account permissions here.
          </p>
        </div>
        <div>
          <Button
            onClick={() => console.log('hola')}
            label="dia"
            color="secondary"
            className="btn-secondary btn-sm"
          />
          <Button
            onClick={() => console.log('hola')}
            label="Semana"
            color="ghost"
            className="btn-outline btn-sm btn-primary ml-3"
          />
          <Button
            onClick={() => console.log('hola')}
            label="Nueva cita"
            className="btn-primary btn-sm ml-3"
          />
        </div>
      </section>
      <div className="divider my-7" />
      <AppointmentContent
        doctors={doctors}
        appointments={appointments}
        patients={patients}
      />
    </main>
  );
}
