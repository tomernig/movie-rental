const router=require('express').Router();// יצירת אובייקט של ראוטר
const {getAllMovies,getMovieById,addMovie,deleteMovieById,updateMovieById}=require('../controllers/movie');
const authMiddle=require('../middlewares/authorization');// שילוב שכבת האבטחה

router.get('/',getAllMovies);// הגדרת ניתוב לבקשה שיטת גט לנתיב /movie - פתוח לכולם
router.get('/:id',getMovieById);// חיפוש סרט לפי קוד - פתוח לכולם
router.post('/',authMiddle,addMovie);// הוספת סרט - מוגן עם טוקן
router.put('/:id',authMiddle,updateMovieById);// עדכון סרט - מוגן עם טוקן
router.delete('/:id',authMiddle,deleteMovieById);// מחיקת סרט - מוגן עם טוקן

module.exports=router;
