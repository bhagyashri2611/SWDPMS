export interface AssetTypeInstance{ 
    InstanceID:number;  
    UserID:number; 
    ModuleID:number;         
    AssetTypeID :number;
    Name : string;
    Description : string;
    CreatedBy : string;
    CreatedDate : string;
    ModifiedBy : string;
    ModifiedDate : string;
    SupplierName : string;
    ModuleName : string;
    AssetName : string;
}

export interface IAssetTypeInstance{    
    Msg:String; 
    ServiceResponse :number;
    Data : AssetTypeInstance[];
}