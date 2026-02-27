require('dotenv').config();// הפעלת הפונקציה שמשלבת את משתני הסביבה מתוך הקובץ דוט איאנוי
const express=require('express');
const app=express();
const movieRouter=require('./api/v1/routes/movie');// שילוב של הראוטר של סרטים
const userRouter=require('./api/v1/routes/user');// שילוב של הראוטר של משתמשים
const rentalRouter=require('./api/v1/routes/rental');// שילוב של הראוטר של השכרות
const morgan=require('morgan');
const mongoose=require('mongoose');// קישור לספריית מונגוס
const cors=require('cors');// קישור לספריית קרוס המנהלת גישה ברמת קוד של דומיינים חיצוניים לאתר

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());// הוספת שכבה לטיפול בבקשות עם גוף בקידוד של ג'ייסון
app.use(express.urlencoded());// הוספת שכבה לטיפול בבקשות עם גוף בקשה בקידוד של יואראל אנקודד

const mongoUser=process.env.MONGO_USER;
const mongoPass=process.env.MONGO_PASS;
const mongoServer=process.env.MONGO_SERVER;
// Connection String - מחרוזת התחברות
const mongoConnstr=`mongodb+srv://${mongoUser}:${mongoPass}@${mongoServer}/MovieRental`;

// פתיחת החיבור לבסיס הנתונים
mongoose.connect(mongoConnstr).then((stat)=>{
    console.log("Connected to MongoDB");
});

// הגדרת הניתובים של האפליקציה
app.use('/movie',movieRouter);
app.use('/user',userRouter);
app.use('/rental',rentalRouter);


module.exports=app;
