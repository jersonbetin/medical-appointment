import { AppointmentInput, IAppointment } from '@/interfaces/appointments';
import axios, { AxiosInstance } from 'axios';

class AppointmentService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 3000,
      timeoutErrorMessage: 'Time Out',
    });
  }

  searchByDate = (
    date: string,
    token?: string,
  ): Promise<Array<IAppointment>> => {
    const data = {
      resourceType: 'Appointment',
      params: {
        date,
      },
    };

    const config = {
      headers: { Authorization: `Bearer ${token || ''}` },
    };

    return this.instance
      .post('/searchResource', data, config)
      .then(({ data }) => {
        return data?.resourcesFound?.resourcesData.map((appoint: any) => {
          const patientCode =
            appoint.resource.participant.find(
              (participant: any) =>
                participant?.actor?.reference?.includes?.('Patient'),
            )?.actor?.reference || '';

          const doctorCode =
            appoint.resource.participant.find(
              (participant: any) =>
                participant?.actor?.reference?.includes?.('Practitioner'),
            )?.actor?.reference || '';

          const type =
            appoint?.resource?.serviceType?.[0]?.coding?.[0]?.display || '';

          return {
            id: appoint.resource.id,
            date: {
              start: appoint.resource.start,
              end: appoint.resource.end,
            },
            patientId: patientCode.split('/')[1],
            doctorId: doctorCode.split('/')[1],
            type,
          } as IAppointment;
        });
      });
  };

  create = (
    resource: AppointmentInput,
    token?: string,
  ): Promise<IAppointment> => {
    const config = {
      headers: { Authorization: `Bearer ${token || ''}` },
    };

    return this.instance
      .post('/createResource', resource, config)
      .then(({ data: appoint }) => {
        const patientCode =
          appoint.resourceData.participant.find(
            (participant: any) =>
              participant?.actor?.reference?.includes?.('Patient'),
          )?.actor?.reference || '';

        const doctorCode =
          appoint.resourceData.participant.find(
            (participant: any) =>
              participant?.actor?.reference?.includes?.('Practitioner'),
          )?.actor?.reference || '';

        const type =
          appoint?.resourceData?.serviceType?.[0]?.coding?.[0]?.display || '';

        return {
          id: appoint.resourceData.id,
          date: {
            start: appoint.resourceData.start,
            end: appoint.resourceData.end,
          },
          patientId: patientCode.split('/')[1],
          doctorId: doctorCode.split('/')[1],
          type,
        } as IAppointment;
      });
  };
}

export default AppointmentService;
