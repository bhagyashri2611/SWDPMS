export interface Language{     
    LanguageID :number;
    Name : string;
}

export interface ILanguageResponce{    
    Msg:String; 
    ServiceResponse :number;
    Data : Language[];
}