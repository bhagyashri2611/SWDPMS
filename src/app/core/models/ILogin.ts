export interface Login{   
    LoginID :number;
    Username : string;
    LoginPwd : string;
    LoginType:number;
    UserID :number;
}

export interface ILogin{  
    Msg:string;   
    ServiceResponse :number;
    Data : Login[];
}

export interface Responce{ 
    Error:any;    
    ServiceResponse :number;
    
}