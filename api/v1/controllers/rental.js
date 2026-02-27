const Rental=require('../models/rental');
const Movie=require('../models/movie');
const jwt=require('jsonwebtoken');
const PrivateKey=process.env.PRIVATE_KEY || "abcd1234";// מפתח פרטי להצפנה

let obj={
    getAllRentals:(req,res)=>{
        // מבצעים חיפוש של כל ההשכרות
        Rental.find().then((data)=>{
            return res.status(200).json(data);
        });
    },
    getRentalsByUser:(req,res)=>{
        const userName=req.params.userName;// שם המשתמש שנשלח כפרמטר
        // חיפוש כל ההשכרות של המשתמש
        Rental.find({userName:userName}).then((data)=>{
            return res.status(200).json(data);
        });
    },
    rentMovie:(req,res)=>{
        const {userName,mid}=req.body;// שליפת שם המשתמש וקוד הסרט מגוף הבקשה
        // נבדוק שהסרט קיים ושיש עותקים זמינים
        Movie.find({mid:mid}).then((data)=>{
            if(data.length==0)// אם הסרט לא נמצא
            {
                return res.status(200).json({message:"Movie not found"});
            }
            else if(data[0].copies<=0)// אם אין עותקים זמינים
            {
                return res.status(200).json({message:"No copies available"});
            }
            else{
                // יצירת השכרה חדשה
                Rental.create({
                    userName:userName,
                    mid:mid,
                    rentDate:new Date(),// תאריך השכרה - עכשיו
                    returnDate:null,// תאריך החזרה - ריק עד שהלקוח מחזיר
                    isReturned:false// הסרט עדיין לא הוחזר
                }).then((rental)=>{
                    // עדכון מספר העותקים הזמינים - הורדה ב 1
                    Movie.updateOne({mid:mid},{copies:data[0].copies-1}).then(()=>{
                        return res.status(200).json({message:"Movie rented successfully",rental});
                    });
                });
            }
        });
    },
    returnMovie:(req,res)=>{
        const id=req.params.id;// קוד ההשכרה שנשלח כפרמטר
        // חיפוש ההשכרה לפי האיידי של מונגו
        Rental.findById(id).then((rental)=>{
            if(!rental)// אם ההשכרה לא נמצאה
            {
                return res.status(200).json({message:"Rental not found"});
            }
            else if(rental.isReturned)// אם הסרט כבר הוחזר
            {
                return res.status(200).json({message:"Movie already returned"});
            }
            else{
                // עדכון ההשכרה - סימון שהסרט הוחזר ועדכון תאריך החזרה
                Rental.updateOne({_id:id},{isReturned:true,returnDate:new Date()}).then(()=>{
                    // עדכון מספר העותקים הזמינים - הוספה ב 1
                    Movie.find({mid:rental.mid}).then((data)=>{
                        Movie.updateOne({mid:rental.mid},{copies:data[0].copies+1}).then(()=>{
                            return res.status(200).json({message:"Movie returned successfully"});
                        });
                    });
                });
            }
        });
    }
};

module.exports=obj;
