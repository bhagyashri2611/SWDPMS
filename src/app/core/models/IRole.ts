export interface roleModel{  
    _id:String;   
    roleID:  number,
    roleName: String,
    description:String, 
    createdOn:Date,
    createdBy: String,
    modifiedOn:Date,
    modifiedBy: String ,   
}

export interface IroleResponce{    
    message:String; 
    status :number;
    data : roleModel[];
}