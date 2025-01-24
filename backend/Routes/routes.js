const express = require('express');
const app =express()
const mongoose = require('mongoose')
const router = express.Router();
const  BMWProduct =require('../BMW_Models/bmw.models');
const { errorMessages,endpoints } = require('../constants');

router.get('/',(req,res)=>{
    res.send('i am runing ')
})


router.post(endpoints?.models,async(req,res)=>{
        try {
                const newAddedProduct=await BMWProduct.create(req.body)
                res.status(200).json(newAddedProduct)
            } catch (error) {
                    res.status(500).json({message:error?.message})
                }
            })
//for all the data to be fetched at once testing purpose 
router.get(endpoints?.models,async(req,res)=>{
    try {
        const bmwModels=await BMWProduct.find({});
        res.status(200).json(bmwModels)
        
    } catch (err) {
        res.status(500).json({message:errorMessages?.unableToFetchModels})
        
    }
})
// paginated api to  fetch the large data 

router.get(`${endpoints?.pagination}`,async(req,res)=>
    {
        try {
            const {pageNo=1,limit=10}=req.query
            const skip=(pageNo-1)*limit
            const bmwModels= await BMWProduct.find({}).skip(skip).limit(Number(limit))
            const totalModels= await BMWProduct.countDocuments({});
            const totalPages=Math.ceil(totalModels/limit)
            const remainingPages=totalPages-pageNo
            res.status(200).json({
                totalPages,
                currentPageNo:Number(pageNo),
                remainingPages,
                totalModels,
                bmwModels

            })
            
        } catch (err) {
            res.status(500).json({message:errorMessages?.unableToFetchModels})
            
        }
    })

//searching within the posiible string 

router.get(`${endpoints?.search}`,async(req,res)=>{

    const {brand,model,bodyStyle}=req.query
    try {
        const bmwData=await BMWProduct.find({})
        let filteredbmwData=bmwData
        if (brand){
            filteredbmwData=filteredbmwData.filter(car=>car.Brand.toLowerCase().includes(brand.toLowerCase()))
        }
        if (model){
            filteredbmwData=filteredbmwData.filter(car=>car.Model.toLowerCase().includes(model.toLowerCase()))
        }
        if (bodyStyle){
            filteredbmwData=filteredbmwData.filter(car=>car.bodyStyle.toLowerCase().includes(bodyStyle.toLowerCase()))

        }
        res.status(200).json(filteredbmwData)
    } catch (error) {
        res.status(500).json({message:errorMessages?.unableToFetchModels})
    }

})

//api for getting the dynamic data 
router.get(`${endpoints?.keys}`,async(req,res)=>{
    try {
        const keys=[
            {key:"Brand",type:'isString'},
            {key:"Model",type:'isString'},
            {key:"AccelSec",type:'isNumber'},
            {key:"TopSpeed_KmH",type:'isNumber'},
            {key:"Range_Km",type:'isNumber'},
            {key:"Efficiency_WhKm",type:'isNumber'},
            {key:"FastCharge_KmH",type:'isNumber'},
            {key:"RapidCharge",type:'isBoolean'},
            {key:"PowerTrain",type:'isString'},
            {key:"PlugType",type:'isString'},
            {key:"BodyStyle",type:'isString'},
            {key:"Segment",type:'isString'},
            {key: "Seats", type: "isNumber" },
            {key: "PriceEuro", type: "isNumber" },
            {key: "Date", type: "isDate" },




        ]
        res.status(200).json(keys)
    } catch (error) {
        res.status(500).json({message:errorMessages?.unableToFetchModels})
    }
})


    
            //making the api for t
            module.exports = router