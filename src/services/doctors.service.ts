import { IAddress, IDoctors } from '@/interfaces/doctors';
import { TOKEN } from '@/utils/constants';
import axios, { AxiosInstance } from 'axios';
import Cookie from 'js-cookie';

class DoctorService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 3000,
      timeoutErrorMessage: 'Time Out',
    });
  }

  search = (token?: string): Promise<Array<IDoctors>> => {
    const data = {
      resourceType: 'Practitioner',
      params: {
        'family:contains': 'to',
      },
    };

    const config = {
      headers: { Authorization: `Bearer ${token || Cookie.get(TOKEN)}` },
    };

    return this.instance
      .post('/searchResource', data, config)
      .then(({ data }) => {
        return data?.resourcesFound?.resourcesData?.map((item: any) => {
          const id = item.resource.id;
          const name = `${item.resource.name?.[0].prefix?.[0]} ${item.resource.name?.[0].given?.[0]} ${item.resource.name?.[0].family}`;
          const gender = item.resource.gender;
          const resourceType = item.resource.resourceType;
          const address: IAddress = item.resource.address;

          return {
            id,
            name,
            gender,
            resourceType,
            address,
          } as IDoctors;
        });
      });
  };
}

export default DoctorService;
