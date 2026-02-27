const mongoose=require('mongoose');// קישור לספריית מונגוס
// ניצור סכימה- שזה מבנה עבור משתמש
const Schema=new mongoose.Schema({
    userName:String,
    hashPass:String,
    fullName:String
    
});
module.exports=mongoose.model('users',Schema);
