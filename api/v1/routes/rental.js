const router=require('express').Router();// יצירת אובייקט של ראוטר
const {getAllRentals,getRentalsByUser,rentMovie,returnMovie}=require('../controllers/rental');
const authMiddle=require('../middlewares/authorization');// שילוב שכבת האבטחה

router.get('/',authMiddle,getAllRentals);// צפייה בכל ההשכרות - מוגן עם טוקן
router.get('/user/:userName',authMiddle,getRentalsByUser);// צפייה בהשכרות של משתמש מסוים
router.post('/',authMiddle,rentMovie);// השכרת סרט - מוגן עם טוקן
router.put('/return/:id',authMiddle,returnMovie);// החזרת סרט - מוגן עם טוקן

module.exports=router;
