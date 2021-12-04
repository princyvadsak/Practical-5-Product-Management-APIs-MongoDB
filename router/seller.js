const express = require("express");
const router = express.Router();
router.use(express.json());

const seller = require("../Model/seller");
const product = require("../Model/product");

router.get("/productOfSeller", async (req,res)=>{
    const name = req.body.name;
    if(name){
    const details = await seller.findOne({name:name});
    if(details){
        const pDetail = await product.findOne({product_id:details["product_id"]});
        return res.json({data:pDetail});
          }
    return res.json({data:"No Data Found"});
}
return res.json({data:"Title is blank.plese enter title."});
});

router.post("/addseller",(req,res)=>{
    const {addSeller} = req.body;

    if(addSeller){
        seller.create(addSeller);
        return res.json({data:"New Seller Add Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});


router.put("/updateSellerProductId", async (req,res)=>{
    const sId = req.body.seller_id;
    const pId = req.body.product_id;
    if(sId && pId){
    const findsid = await seller.findOne({seller_id:sId});
    if(findsid){
        const details = await seller.findOneAndUpdate({seller_id:sId , product_id:pId});
            return res.json({data:"Product_Id Update Successfully",Update : details});
        }
    return res.json({data:"No Data Found"});
}
return res.json({data:"please enter selllerid and productid both."});

});


router.delete("/deleteSeller", async (req,res)=>{
    const sId = req.body.seller_id;
    if(sId){
    const details = await seller.findOne({seller_id:sId});
    if(details){
        seller.findOneAndDelete({seller_id:sId});
        return res.json({data:"Delete Seller Successfully",deleted:details});
         }
    return res.json({data:"No Data Found"});
}
return res.json({data:"please enter selllerid."});

});


module.exports = router;