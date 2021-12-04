const express = require("express");
const router = express.Router();
router.use(express.json());

const company = require("../Model/company");
const product = require("../Model/product");

router.get("/productOfCompany", async (req,res)=>{
    const name = req.body.name;
    if(name)
    {
    const details = await company.findOne({name:name});
    if(details){
        const pDetail = await product.find({product_id:details["product_id"]});
        return res.json({data:pDetail});
               }
    return res.json({data:"No Data Found"});  
    }
    return res.json({data:"Name is blank.plese enter name."});

});

router.post("/addCompany",(req,res)=>{
    const {addCompany} = req.body;

    if(addCompany){
        company.create(addCompany);
        return res.json({data:"New Company Add Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

router.put("/updateCompanyProductId", async (req,res)=>{
    const cId = req.body.company_id;
    const pId = req.body.product_id;
    if(cId && pId){
    const findCid = await company.findOne({company_id:cId});
    if(findCid){
        const details = await company.findOneAndUpdate({company_id:cId , product_id:pId});
            return res.json({data:"Product_Id Update Successfully",Update : details});
        }
    return res.json({data:"No Data Found"});
}
return res.json({data:"please enter companyid and productid both."});

});

router.delete("/deleteCompany", async (req,res)=>{
    const cId = req.body.company_id;
    if(cId){
    const findCid = await company.findOne({company_id:cId});
    if(findCid){
        company.findOneAndDelete({company_id:cId});
        return res.json({data:"Delete Company Successfully",deleted:findCid});
         }
    return res.json({data:"No Data Found"});
}
return res.json({data:"please enter companyid."});
});


module.exports = router;