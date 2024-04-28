import { wardModel } from './IWard';

export interface MasticRoadModel {
  _id: string;

  locationName: String;
  wardName: wardModel;
  length: number;
  width: number;

  existingSurface: string;
  existingSurfaceSideStrip: string;
  dlp: string;
  nonDlp: string;
  division: string;

  createdOn: Date;
  createdBy: String;
  modifiedOn: Date;
  modifiedBy: String;
}

export interface IMasticRoadResponse {
  message: String;
  status: number;
  data: [];
}
