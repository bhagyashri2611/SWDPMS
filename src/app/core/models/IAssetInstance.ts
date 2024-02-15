import { AssetModel } from './IAsset';
import { LocationModel } from './ILocation';
import { ModuleModel } from './IModule';
import { PandMAttribute } from './IPandMAttribute';

export interface AssetInstanceModel{ 
    _id:string;   
    assetInstanceID:number; 
    location:string;         
    module :string;
    asset :string;
    assetInstanceName : string,
    description: string,
   
    attributeValues:any[],   
    isActive: number,
    createdOn: Date,
    createdBy:  String,
    modifiedOn: Date ,
    modifiedBy: string ,

}

export interface IAssetInstanceResponce{    
    message:String; 
    status :number;
    data : AssetInstanceModel[];
}


export interface AssetInstanceListModel{  
    _id:string;  
    assetInstanceID:number; 
    location:LocationModel;         
    module :ModuleModel;
    asset :AssetModel;
    assetInstanceName : string;
    attributeValues:any;
    description: string;

    isActive: number;
    createdOn: Date;
    createdBy:  String;
    modifiedOn: Date;
    modifiedBy: string;
}


export interface IAssetInstanceListResponce{    
    message:String; 
    status :number;
    data : AssetInstanceListModel[];
}
export interface Attributes{    
    keyName:String,
    pandmAttribute:PandMAttribute   
}
export interface AssetPandMAttributeGroupModel{     
    groupName: String,     
    asset : AssetModel,
    attributes:PandMAttribute[]     
    defaultModel:any,   
    createdOn: Date,
    createdBy:  String,
    modifiedOn: Date ,
    modifiedBy: string ,

}
export interface IAssetPandMAttributeGroupModelResponce{    
    message:String; 
    status :number;
    data : AssetPandMAttributeGroupModel[];
}

