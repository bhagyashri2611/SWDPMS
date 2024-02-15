import { UnitModel} from './IUnit';

export interface PandMAttribute{  
    _id:String,
    keyName:String,
    attributeID: Number,
    description:String,
    mandatory: Boolean,
    dataType:String,
    maxLength:Number,
    integerPart:Number,
    decimalPart:Number,
    uom:UnitModel,
    multiline:Boolean,
    maxValue:Number,
    minValue:Number,
    displayLabel:String,
    isHidden:Boolean,
    createdOn:Date,
    createdBy: String,
    modifiedOn:Date,
    modifiedBy: String,
}

export interface IPandMAttributeResponce{    
    message:String; 
    status :number;
    data : PandMAttribute[];
}

// export interface SearchUser{     
//     userID: Number;
//     userName:String;
//     email:String; 
// }

// export interface UserAttrlable{     
//     DataTypeID :number;
//     AttributeLabel : string;
//     UserAttrID :number;
//     UserAttributeValue :string;
//     Unit : string;
// }