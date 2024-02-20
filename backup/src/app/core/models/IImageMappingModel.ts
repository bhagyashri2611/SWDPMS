export interface ImageMappingModel {
    ImgMapID: Number,
    UserId: Number,
    VehicleNo: String,
    LogSheetNo: String,
    WorkCode: String,
    ImageCategoryID: Number,
    Image: String,
    Lat: Number,
    Long: Number,
    ImageCategoryName: String
    SiltQuantityID: Number
    NallahSystem: String
    loadindDataList: ImageMappingModel[]
    UnloadindDataList: ImageMappingModel[]
    VideoDataList: ImageMappingModel[]
}
export interface IImageMappingModelResponce {
    Msg: String;
    ServiceResponse: number;
    Data: ImageMappingModel[];

}