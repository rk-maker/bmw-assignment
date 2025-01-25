

const responseStructure=(res,data,status="00",message="Success",httpStatus="200")=>{
res.status(Number(httpStatus)).json({
    status:status,
    data:data,
    message:message

})
}
module.exports=responseStructure