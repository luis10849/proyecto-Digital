const express= require("express");
const router= express.Router();
const {isLogin,isNotLogin}=require('../lib/seguridad');

router.get('/',isNotLogin,(req,res)=>{
    res.render('index');
})
module.exports=router;