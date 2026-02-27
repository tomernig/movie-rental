const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const PrivateKey=process.env.PRIVATE_KEY || "abcd1234";// מפתח פרטי להצפנה

let obj={
    getAllUsers:(req,res)=>{
        // מבצעים חיפוש של כל המשתמשים בטבלת משתמשים
        User.find().then((data)=>{
            return res.status(200).json(data);
        });
    },
    getUserById:(req,res)=>{
        const id=req.params.id;// שמירת הפרמטר איידי
        User.findById(id).then((user)=>{
            return res.status(200).json(user);
        });
    },
    register:(req,res)=>{
        const {userName,pass,fullName}=req.body;// שליפת הערכים שנשלחו בגוף הבקשה לצורך הרשמה
        // לפני הוספת משתמש חדש, נבדוק האם קיים משתמש עם אותו שם משתמש
        User.find({userName:userName}).then((data)=>{
            if(data.length>0)// במידה וקיים משתמש עם שם המשתמש שנבחר
            {
                return res.status(200).json({message:"User Already Exist"});
            }
            else{
                bcrypt.hash(pass,10).then((hashPass)=>{// הצפנת הסיסמה שקיבלנו
                    User.create({userName,hashPass,fullName}).then((user)=>{// שמירת פרטי המשתמש בבסיס הנתונים
                        return res.status(200).json({message:"Registered Successfully"});
                    });
                });
            }
        });
    },
    login:(req,res)=>{
        const {userName,pass}=req.body;// שליפת שם המשתמש והסיסמה מגוף הבקשה
        // חיפוש המשתמש בבסיס הנתונים
        User.find({userName:userName}).then((data)=>{
            if(data.length==0)// במידה ולא נמצא משתמש עם שם המשתמש שנשלח
            {
                return res.status(401).json({message:"User Not Found"});
            }
            else{
                // השוואת הסיסמה שנשלחה מול הסיסמה המוצפנת בבסיס הנתונים
                bcrypt.compare(pass,data[0].hashPass).then((status)=>{
                    if(status)// במידה והסיסמה תואמת
                    {
                        // יצירת טוקן שמצפין את שם המשתמש והשם המלא
                        let token=jwt.sign({userName:data[0].userName,fullName:data[0].fullName},PrivateKey,{expiresIn:'1h'});
                        return res.status(200).json({message:"Login Successful",token});
                    }
                    else{
                        return res.status(401).json({message:"Wrong Password"});
                    }
                });
            }
        });
    }
};

module.exports=obj;
