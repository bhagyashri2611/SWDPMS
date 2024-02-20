
export interface MinorSiltQuantityModel {   
        ID :Number,      
        UserId :Number,       
        Ward :String       
        Zone :String       
        Workcode :String      
        Parentcode :String    
        TotalLengthOfMinorNalla :String       
        TotalLengthOfRoadsideDrain :String       
        TotalWaterEntrances :String       
        TotalNosOfLaterals :String       
        TotalDesiltQuantity :String       
        PremonsoonDesiltQuantity :String       
        DuringMonsoonDesiltQuantity :String       
        AftrMonsoonDesiltQuantity :String       
        TotalActNetWeight :String       
        TotalVehicle :String       
        PercentOfPremonsoon :String       
        ExecutiveEngg :String       
        ZoneRegion :String       
        BillablePercent :String       
        BillableQuantity :String           
        FromDate :String       
        ToDate :String
}

export interface IMinorSiltQuantityResponce {
    Msg: String;
    ServiceResponse: number;
    Data: MinorSiltQuantityModel[];

}