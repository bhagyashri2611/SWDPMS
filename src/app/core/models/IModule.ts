import { AssetModel } from './IAsset';

export interface ModuleModel {
  _id: String;
  moduleID: number;
  moduleName: String;
  assets: AssetModel[];
  description: String;
  priority: number;
  createdOn: Date;
  createdBy: String;
  modifiedOn: Date;
  modifiedBy: String;
}

export interface IModuleResponce {
  message: String;
  status: number;
  data: ModuleModel[];
}
