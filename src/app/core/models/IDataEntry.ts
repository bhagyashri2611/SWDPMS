
import { UserModule } from 'src/app/modules/user/user.module';
import { AssetModel } from './IAsset';
import { AssetInstanceModel } from './IAssetInstance';
import { LocationModel } from './ILocation';
import { ModuleModel } from './IModule';
import { ModulesInLocationModel } from './IModules-In-Location';

import { PandMAttribute } from './IPandMAttribute';
import { User } from './IUser';


export interface AttributeValues{    
    keyName:String,
    keyValue:any   
}


export interface DataEntryModel{     
    location:LocationModel,       
    module :ModulesInLocationModel,
    assetInstance : AssetInstanceModel,
    dataDate: Date,
    attributeValues:any,   

    locationName:String,
    moduleName:String,
    assetnstanceName:String,

    ward:String,
    zone:String,
    workCode:String,

    contractorName:String,
    roadStatus:String,

    assignedSE:User,
    createdOn: Date,
    createdBy:  String,
    modifiedOn: Date ,
    modifiedBy: string ,
    modifiedByContractor: string ,

}
export interface IDataEntryModelResponce{    
    message:String; 
    status :number;
    data : DataEntryModel[];
}
export interface Attributes{    
    keyName:String,
    pandmAttribute:PandMAttribute   
}
export interface DataEntryGroupModel{     
    groupName: String,   
    module :LocationModel,
    asset : AssetModel,
    isLevelData:Number,
    levelScale:{ type: String },
    levelScaleValue:{ type: Number },
    attributes:Attributes[]     
    dataEntryScreen:any,   
    createdOn: Date,
    createdBy:  String,
    modifiedOn: Date ,
    modifiedBy: string ,

}
export interface IDataEntryGroupModelResponce{    
    message:String; 
    status :number;
    data : DataEntryGroupModel;
}
export interface IDataEntryGroupsModelResponce{    
    message:String; 
    status :number;
    data : DataEntryGroupModel[];
}
export interface ReportSerachParamsModel{    
    location:LocationModel,       
    module :ModuleModel,
    assetInstance : AssetInstanceModel,
    fromDate: string,  
    toDate: string,  
}