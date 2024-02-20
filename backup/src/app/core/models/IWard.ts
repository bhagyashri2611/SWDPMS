export interface wardModel{  
    _id:String;   
    wardID:  number,
    wardName: String,
    zoneName:String, 
    createdOn:Date,
    createdBy: String,
    modifiedOn:Date,
    modifiedBy: String ,   
}

export interface IwardResponce{    
    message:String; 
    status :number;
    data : wardModel[];
}