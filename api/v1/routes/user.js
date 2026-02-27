const router=require('express').Router();// יצירת אובייקט של ראוטר
const {getAllUsers,getUserById,register,login}=require('../controllers/user');
const authMiddle=require('../middlewares/authorization');// שילוב שכבת האבטחה

router.get('/',authMiddle,getAllUsers);// הגדרת ניתוב לבקשה שיטת גט לנתיב /user - מוגן עם טוקן
router.get('/:id',authMiddle,getUserById);
router.post('/register',register);// נקודת קצה להרשמה
router.post('/login',login);// נקודת קצה להתחברות

module.exports=router;
