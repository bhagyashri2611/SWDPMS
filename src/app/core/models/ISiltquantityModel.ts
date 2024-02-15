import { ImageMappingModel } from "./IImageMappingModel";

export interface SiltQuantityModel {
    SiltQuantityID: String,
    Workcode: String,
    Parentcode: String,
    CatchmentNumber: String,
    NallahNo: String,
    NallahSystem: String,
    NallahLength: String,
    AvgWidth: String,
    AgencyNo: String,
    Ward: String,
    AgencyName: String,
    TotalNallahLength: String,
    NumberofMajorNallah: String,
    TotalDesiltQuantity: String,
    PremonsoonDesiltQuantity: String,
    DuringMonsoonDesiltQuantity: String,
    AftrMonsoonDesiltQuantity: String,
    TotalActNetWeight: String,
    TotalVehicle: String,
    PercentOfPremonsoon: String,
    ExecutiveEngg: String,
    ZoneRegion: String,
    BillablePercent: String,
    Zone: String,
    BillableQuantity: String,
    percnt: String,
    FromDate: String,
    ToDate: String,
    VehicleNo: String,
    Logsheet: String,
    UnloadindDataList: ImageMappingModel[],
    LoadindDataList: ImageMappingModel[],
    UnloadindVidDataList: ImageMappingModel[],
    UserId: Number,
    Lat: Number,
    Long: Number,
}

export interface ISiltQuantityModelResponce {
    Msg: String;
    ServiceResponse: number;
    Data: SiltQuantityModel[];

}