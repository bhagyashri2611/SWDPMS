import { LocationModel } from './ILocation';
import { roleModel} from './IRole';



export interface User{  
    _id:String;   
    userID: Number;
    firstName:String;
    lastName:String;
    userName:String;
    email:String;
    password:String;
    role:roleModel;
    mobileNo:String;
    isActive:Boolean;
    locations: LocationModel[],
    wards:any[],   
    roleName:String,
    isDataEntry:String;
    createdOn:Date;
    createdBy:String;
    modifiedOn:Date;
    modifiedBy:String;
}

export interface IUserResponce{    
    message:String; 
    status :number;
    data : User[];
    token:String;

}

export interface SearchUser{     
    userID: Number;
    userName:String;
    email:String; 
}
