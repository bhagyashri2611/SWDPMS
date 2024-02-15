import { UnitModel } from './IUnit';
import { wardModel } from './IWard';

export interface LocationModel {
  _id: string;
  workCode: String;
  locationID: number;
  locationName: String;
  wardName: wardModel;
  zoneName: String;
  description: String;
  contractorName: String;
  startDate: Date;
  endDate: Date;
  length: number;
  lengthUnit: UnitModel;
  width: number;
  widthUnit: UnitModel;
  dlpPeriod: number;
  coordinates: [];
  //latitude: number,
  // longitude:number,
  createdOn: Date;
  createdBy: String;
  modifiedOn: Date;
  modifiedBy: String;
}

export interface ILocationResponse {
  message: String;
  status: number;
  data: LocationModel[];
}

export interface GroupLocationModel {
  _id: string;
  parentLocation: LocationModel;
  childLocation: LocationModel[];
  createdOn: Date;
  createdBy: String;
  modifiedOn: Date;
  modifiedBy: String;
}

export interface IGroupLocationResponse {
  message: String;
  status: number;
  data: GroupLocationModel[];
}
