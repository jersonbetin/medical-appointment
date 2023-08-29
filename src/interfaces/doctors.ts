export interface IAddress {
  city?: string;
  country?: string;
  line?: [string];
  postalCode?: string;
  state?: string;
}

export interface IDoctors {
  id: string | number;
  resourceType: string;
  name: string;
  gender?: string;
  address?: [IAddress] | IAddress;
}
