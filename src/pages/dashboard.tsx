import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';

import Button from '@/components/commons/Button';
import AppointmentContent from '@/components/home/AppointmentContent';
import { IDoctors } from '@/interfaces/doctors';
import { addApolloState, initialApollo } from '@/hooks/apollo';
import { GET_DOCTORS } from '@/graphql/queries/doctors';
import { GET_APPOINTMENTS } from '@/graphql/queries/appointments';
import { GET_PATIENTS } from '@/graphql/queries/patients';
import { IAppointment } from '@/interfaces/appointments';
import { IPatient } from '@/interfaces/patients';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import moment from 'moment';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const apolloClient = initialApollo(null, context);

  try {
    const {
      data: { getDoctors: doctors },
    } = await apolloClient.query({
      query: GET_DOCTORS,
    });
    const {
      data: { getAppointments: appointmentList },
    } = await apolloClient.query({
      query: GET_APPOINTMENTS,
      variables: {
        date: moment().format('YYYY-MM-DD'),
      },
    });
    const {
      data: { getPatients: patients },
    } = await apolloClient.query({
      query: GET_PATIENTS,
    });

    return addApolloState(apolloClient, {
      props: { doctors, appointmentList, patients },
    });
  } catch (e) {
    console.log(e);
    return addApolloState(apolloClient, {
      props: {
        doctors: [],
        appointmentList: [],
        patients: [],
      },
    });
  }
};

export default function Home({
  doctors,
  appointmentList,
  patients,
}: {
  doctors: Array<IDoctors>;
  patients: Array<IPatient>;
  appointmentList: Array<IAppointment>;
}) {
  const [appointments, setAppointments] =
    useState<Array<IAppointment>>(appointmentList);
  const [active, setActive] = useState<Boolean>(false);

  return (
    <main
      className={`grid grid-cols-${
        active ? '2' : '1'
      } border-1 w-full h-full bg-gray-50 text-black`}
    >
      <div className=" p-8">
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
            {!active && (
              <Button
                onClick={() => setActive(true)}
                label="Nueva cita"
                className="btn-primary btn-sm ml-3"
              />
            )}
          </div>
        </section>
        <div className="divider my-7" />
        <AppointmentContent
          doctors={doctors}
          appointments={appointments}
          setAppointments={setAppointments}
          patients={patients}
        />
      </div>
      {active && (
        <div className="w-full h-screen	 border-t-8 border-t-green-700 shadow-sm bg-white">
          {/* <span onClick={() => setActive(false)}>cancel</span> */}
          <AppointmentForm
            doctors={doctors}
            patients={patients}
            handleClose={setActive}
          />
        </div>
      )}
    </main>
  );
}
