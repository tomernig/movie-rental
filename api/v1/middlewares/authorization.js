const jwt=require('jsonwebtoken');
const PrivateKey=process.env.PRIVATE_KEY || "abcd1234";// מפתח פרטי להצפנה

// שכבת ביניים של אבטחה שבודקת האם קיים טוקן בבקשה
// במידה ולא קיים מחזירה הודעת שגיאה
// במידה וקיים, מאמתת את הטוקן ומעבירה לשכבה הבאה
const authMiddle=(req,res,next)=>{
    try{
        // שליפת תוכן ההדר של אוטוריזיישן
        const authString=req.headers.authorization;
        // פיצול התוכן למערך בגודל שניים, כאשר המפצל הוא התו רווח שנמצא בין המילה bearer ל token
        const arr=authString.split(' ');
        // שמירת הטוקן בתוך משתנה
        const token=arr[1];
        // אימות הטוקן באמצעות השיטה verify
        // השיטה מקבלת את הטוקן ואת המפתח הפרטי
        const obj=jwt.verify(token,PrivateKey);
        // הדפסת התוכן המפוענח לקונסול
        console.log(obj);
        // העברה לשכבה הבאה
        next();
    }
    catch(err){
        // החזרת שגיאה עם פירוט השגיאה
        return res.status(401).json({msg:"You are not authorized"});
    }
};

module.exports=authMiddle;
