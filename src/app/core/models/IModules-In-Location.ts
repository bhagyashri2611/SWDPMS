import { LocationModel } from './ILocation';
import { ModuleModel } from './IModule';
import { UnitModel } from './IUnit';

export interface ModulesInLocationModel {
    _id: string;
    location: LocationModel,
    module: ModuleModel,
    quantity:number,
    totalCost:number,
    totaldays:number,
    startDate:Date,
    endDate:Date,
    rateofwork:number,
    priority:number,
    units:UnitModel,

    quantityPerDay: number,
    plannedQuantity: number,
    cumulativeQuantity: number,

    isActive: Number,

    createdOn: Date,
    createdBy: String,
    modifiedOn: Date,
    modifiedBy: String,
}

export interface IModulesInLocationResponse {
    message: String;
    status: number;
    data: ModulesInLocationModel[];
}

export interface ModulesInLocationObjectModel {
    _id: string;
    location: String,
    module: String,
    isActive: Number,
    createdOn: Date,
    createdBy: String,
    modifiedOn: Date,
    modifiedBy: String,
}
export interface ModulesInLocationObjectModelList {
    modules:ModulesInLocationObjectModel[];
}


