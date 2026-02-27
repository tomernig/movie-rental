const mongoose=require('mongoose');// קישור לספריית מונגוס
// ניצור סכימה- שזה מבנה עבור השכרה של סרט
const Schema=new mongoose.Schema({
    userName:String,// שם המשתמש ששכר את הסרט
    mid:Number,// קוד הסרט
    rentDate:Date,// תאריך השכרה
    returnDate:Date,// תאריך החזרה - יהיה ריק עד שהלקוח מחזיר
    isReturned:Boolean// האם הסרט הוחזר
    
});
module.exports=mongoose.model('rentals',Schema);
