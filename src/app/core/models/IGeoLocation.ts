import { LocationModel } from './ILocation';

export interface GeoLocationModel {
  location: LocationModel;
  properties: any[];
  coordinates: any;
  createdOn: Date;
  createdBy: String;
  modifiedOn: Date;
  modifiedBy: string;
}

export interface IGeoLocationResponse {
  message: String;
  status: number;
  data: GeoLocationModel[];
}