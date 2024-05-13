export default interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  timeStamp: string;
}

export interface AddressWithId extends Address {
  id: string;
}