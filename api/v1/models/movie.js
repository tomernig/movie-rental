const mongoose=require('mongoose');// קישור לספריית מונגוס
// ניצור סכימה- שזה מבנה עבור סרט
const Schema=new mongoose.Schema({
    mid:Number,
    title:String,
    genre:String,
    year:Number,
    price:Number,
    copies:Number
    
});
module.exports=mongoose.model('movies',Schema);
