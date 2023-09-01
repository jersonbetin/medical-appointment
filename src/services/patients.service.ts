import axios, { AxiosInstance } from 'axios';

class PatientService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 3000,
      timeoutErrorMessage: 'Time Out',
    });
  }

  search = (token?: string): Promise<Array<any>> => {
    const data = {
      resourceType: 'Patient',
      params: {
        'family:contains': 'sm',
      },
    };

    const config = {
      headers: { Authorization: `Bearer ${token || ''}` },
    };

    return this.instance
      .post('/searchResource', data, config)
      .then(({ data }) => {
        return data?.resourcesFound?.resourcesData?.map((item: any) => {
          const id = item.resource.id;
          const gender = item.resource.gender;
          const birthDate = item.resource.birthDate;
          const name = `${item.resource.name?.[0]?.given?.[0]} ${item.resource.name?.[0]?.family}`;

          return {
            id,
            name,
            gender,
            birthDate,
          };
        });
      });
  };
}
export default PatientService;
