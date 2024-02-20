export interface UnitModel{  
    _id:String;   
    unitID:  number,
    unitName: String,
    type:String,
    description:String, 
    createdOn:Date,
    createdBy: String,
    modifiedOn:Date,
    modifiedBy: String ,   
}

export interface IUnitResponce{    
    message:String; 
    status :number;
    data : UnitModel[];
}