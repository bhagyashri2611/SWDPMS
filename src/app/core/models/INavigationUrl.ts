export interface  NavigationUrlCollection{  
    wwl:NavigationUrlModel[];  
    phr:NavigationUrlModel[]; 
    powerconsumption:NavigationUrlModel[];   
    maintenance:NavigationUrlModel[];
    laboratory:NavigationUrlModel[];
    wwtf:NavigationUrlModel[];
    missingdata:NavigationUrlModel[];
    config:NavigationUrlModel[];
}
export interface NavigationUrlModel{  
  
    displayLabel: String,
    querySring:String,    
    navigationUrl: String,
    
}
export interface INavigationUrlCollectionResponce{    
    message:String; 
    status :number;
    data : NavigationUrlCollection;
}