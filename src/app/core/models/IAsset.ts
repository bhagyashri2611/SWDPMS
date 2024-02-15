import { UnitModel} from './IUnit';

export interface AssetModel{  
    _id:string;   
    assetID:  number,
    assetName: String,
    description:String, 
    uom:UnitModel,
   // quantity:number,
    rate:number,
    //amount:number,
    createdOn:Date,
    createdBy: String,
    modifiedOn:Date,
    modifiedBy: String ,   
}

export interface IAssetResponce{    
    message:String; 
    status :number;
    data : AssetModel[];
}