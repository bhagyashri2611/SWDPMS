export interface ProgressModel {
   
    Zone: String,
    TotalDesiltQuantity: number;
    TotalPremonsoonDesiltQuantity: number;
    TotalDuringmonsoonDesiltQuantity: number;
    TotalAftermonsoonDesiltQuantity: number;
    YesterdayTotalQua: number;
    YesterdayVehCount: number;
    TodayTotalQua: number;
    TodayVehCount: number;
    TotalPreActNetWt: number;
    TotalPreVehCount: number;
    TotalMidActNetWt: number;
    TotalMidVehCount: number;
    TotalAfterActNetWt: number;
    TotalAfterVehCount: number;
    TotalActNetWt: number;
    TotalVehCount: number;
    PercentPreMonsoon: number;
}

export interface IUserResponce {
    Msg: String;
    ServiceResponse: number;
    ZoneTable: ProgressModel[];
    MithiTable: ProgressModel[];
    MinorTable: ProgressModel[];
}