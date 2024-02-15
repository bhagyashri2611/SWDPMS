
import { AssetModel } from './IAsset';
import { AssetInstanceListModel, AssetInstanceModel } from './IAssetInstance';
import { LocationModel } from './ILocation';
import { ModuleModel } from './IModule';
import { PandMAttribute } from './IPandMAttribute';


export interface AttributeValues{    
    keyName:String,
    keyValue:any   
}

export interface CumulativeGroupByModel{
    location:String,
    module:String    
}
export interface CumulativeReportGroupByModel{
    _id:CumulativeGroupByModel,
    cumulativetotal:Number
}
export interface ICumulativeReportGroupByModelResponse{
    message:String;
    status:number;
    data:CumulativeReportGroupByModel[];
}
// export interface GrpByMonthAndAI{    
//     dataDate:String,
//     assetInstance:String, 
// }

// export interface GrpByLocationAndModule{
//     location:String,
//     module:String,
// }


// export interface ReportGroupByMonthAndAssetInstace{   
//     _id: GroupByModel,
//     records:any[]   
// }

//----start
export interface GroupByModel{
    location:String,
    module:String,
    dataDate:String,
    assetInstance:String    
}
export interface ReportGroupByModel{
    _id:GroupByModel,
    records:any[]
}
export interface IReportGroupByModelResponse{
    message:String;
    status:number;
    data:ReportGroupByModel[];
}
export interface RecordModel{
    assetInstances:AssetInstanceListModel[],
    dataList:ReportGroupByModel[],    
}
export interface IReportGroupFlowResponse{
    message:String;
    status:number;
    data:RecordModel;
}
//----end
//----start

export interface ReportDataEntryModel{     
    location:String,       
    module :String,
    assetInstance : String,
    dataDate: Date,
    attributeValues:any,   
    createdOn: Date,
    createdBy:  String,
    modifiedOn: Date ,
    modifiedBy: string ,

}
export interface ReportGroupByAssetInstace{   
    _id: Date;
    assetInstance:String,
    records:ReportDataEntryModel[]   
}


export interface IReportGrpByAIModelResponce{    
    message:String; 
    status :number;
    data : ReportGroupByAssetInstace[];
}
//----end

// export interface IReportGrpByMonthAndAIModelResponce{    
//     message:String; 
//     status :number;
//     data : ReportGroupByModel[];
// }

//----start
export interface OperationDataMaster{
    _id:Object;  
     ModuleID : number;
     LocationID : number;
     AssetInstanceID : number;
     DataDate : Date;
     SystemTime:String;
     CreatedBy : string;
     CreatedDate : string;
     ModifiedBy : string;
     ModifiedDate : string;
     OperationDataAttributesValues:OperationDataValues[];
 }
 export interface OperationDataValues{
    OperationDataAttributeValueId:String,
    AttributeGroupId : number;
    DataAtrributeId : number;
    DataAttributeValue : string;
}

export interface IOperationDataMasteResponce{    
    message:String; 
    status :number;
    data : OperationDataMaster[];
}

//----end