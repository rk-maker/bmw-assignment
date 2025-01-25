const express = require('express');
const app =express()
const mongoose = require('mongoose')
const router = express.Router();
const  BMWProduct =require('../BMW_Models/bmw.models');
const { errorMessages,endpoints } = require('../constants');
const {sendResponse} =require('../utils/response')
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
        // res.status(200).json()
        res.status(200).json({
            data:bmwModels,
            responseCode:"00",
            message:"Success"
        })
        
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
            {
                headerName: 'Brand',
              type: 'isString',
              field: 'Brand',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Model',
              type: 'isString',
              field: 'Model',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Acceleration',
              type: 'isNumber',
              field: 'AccelSec',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Top Speed',
              type: 'isNumber',
              field: 'TopSpeed_KmH',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Range km/h',
              type: 'isNumber',
              field: 'Range_Km',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Efficiency',
              type: 'isNumber',
              field: 'Efficiency_WhKm',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Fast Charge',
              type: 'isNumber',
              field: 'FastCharge_KmH',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Rapid Charge',
              type: 'isBoolean',
              field: 'RapidCharge',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Power Train',
              type: 'isString',
              field: 'PowerTrain',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Plug Type',
              type: 'isString',
              field: 'PlugType',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Body Style',
              type: 'isString',
              field: 'BodyStyle',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Segment',
              type: 'isString',
              field: 'Segment',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Seats',
              type: 'isNumber',
              field: 'Seats',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Price Euro',
              type: 'isNumber',
              field: 'PriceEuro',
              sortable: true,
              filter: true
            },
            {
                headerName: 'Date',
              type: 'isDate',
              field: 'Date',
              sortable: true,
              filter: true
            }
          ]
          
        // sendResponse(res,keys)\
        // sendResponse(res, keys, "00", "Keys fetched successfully");
        res.status(200).json({
            data:keys,
            responseCode:"00",
            message:"Success"
        })

    } catch (error) {

        res.status(500).json({message:errorMessages?.unableToFetchModels})
    }
})


    
            //making the api for t
             module.exports = router