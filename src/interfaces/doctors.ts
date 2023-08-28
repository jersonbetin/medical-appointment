export interface IAddress {
  city?: string;
  country?: string;
  line?: [string];
  postalCode?: string;
  state?: string;
}

export interface IDoctors {
  name: string;
  gender?: string;
  address?: [IAddress] | IAddress;
}
