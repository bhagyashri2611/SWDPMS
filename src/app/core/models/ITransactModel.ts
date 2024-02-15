

export interface TransactModel {

    SlipSrNo: string,
    Weighbridge: string,

    Trans_Date: string,

    Trans_Time: string,

    Vehicle_No: string,

    DC_No: string,

    Act_Shift: string,

    Type_of_Garbage: string,

    Agency_Name: string,

    Area: string,

    Ward: string,

    Zone_Name: string,

    Section_Name: string,

    Prog_Code: string,

    Route: string,

    ColPt: string,

    Trip_No: string,

    Gross_Weight: number,

    Net_Weight: number,

    canc: string,

    DeliveryLocation: string,

    Updatedby: string,

    TPC_Cover: string,

    On_BMC_Duty: string,

    Hold: string,

    Trans_Date_UL: string,

    Trans_Time_UL: string,

    Unladen_Weight: number,

    Updatedby_UL: string,

    Act_Net_Weight: number,

    Weighbridge_UL: string,

    Act_Shift_UL: string,

    Paid_GatePass: string,

    VehicleType: string,

    PrintedTrue: string,

    In_Vehicle_Image: string,

    Out_Vehicle_Image: string,

    VerifiedBy: string,

    VerifiedDate: string,

    AuthorizedBy: string,

    AuthorizedDate: string,

    VerifiedStatus: string,

    AuthorizedStatus: string,

    Remark: string,

    NotificationStatus: string,

    WorkCode: string,


    ServerName: string,

    MinID: string,

    MaxID: string,

    SlipSrNoNew: string,


    SlipSrNoOld: string,




    BillableNetWeight: number,

    BillableGrossWeight: number,

    BillableUnladenWeight: number,


    Zone: string,


    Parentcode: string,


    FromDate: string,

    ToDate: string,
}

export interface TransactResponce {
    Msg: String;
    ServiceResponse: number;
    CityData: TransactModel[];
    ESData: TransactModel[];
    WSData: TransactModel[];
    MinorData: TransactModel[];
    MithiData: TransactModel[];
}

