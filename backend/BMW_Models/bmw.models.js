
const mongoose = require('mongoose')
const BMWSchema=mongoose.Schema({
    Brand:{
        type:String,
        reqire:[true,"Please enter Brand name"]
    },
    Model:{
        type:String,
        reqire:[true,"Please enter Model "]
    },
    AccelSec:{
        type:Number,
        reqire:true,
        default:0
    },
    TopSpeed_KmH:{
        type:Number,
        reqire:true,
        default:0
    },
    Range_Km:{
        type:Number,
        reqire:true,
        default:0
    },
    Efficiency_Whkm:{
        type:Number,
        reqire:true,
        default:0
    },
    Fastcharge_KmH:{
        type:Number,
        reqire:true,
        default:0
    },
    RapidCharhe:{
        type:Boolean,
        reqire:true,
        default:false

    },
    PowerTrain:{
        type:String,
        require:[true,"Please select the Power Train"]
    },
    PlugType:{
        type:String,
        require:[true,"Please select the PLug TYpe"]
    },
    Segment:{
        type:String,
        require:[true,"Please enter the Segemtn"]
    },
    Seats:{
        type:Number,
        reqire:true,
        default:1
    },
    PriceEuro:{
        type:Number,
        reqire:true,
        default:0
    },
    Date:{
        type:String,
        reqire:[true,"Please enter date"],
        
    },
})
const BMWProduct=mongoose.model("BMWProduct",BMWSchema)
module.exports=BMWProduct