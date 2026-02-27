# פרויקט השכרת סרטים - תומר גלפר

זה פרויקט ב-Node.js שמדמה מערכת השכרת סרטים (כמו בלוקבסטר).
השתמשתי ב-Express וב-MongoDB כדי לנהל את המידע.

## איך להריץ את זה?

1. להריץ `npm install` כדי להתקין ספריות.
2. להריץ `npm start` - השרת עובד בפורט 5050.

## חשוב - קובץ .env

לא העלתי את קובץ ה-`.env` שלי לגיטהאב מטעמי אבטחה.
צריך ליצור קובץ כזה בתיקייה הראשית ולהכניס את פרטי ההתחברות שלכם:

```
MONGO_USER=   // שם משתמש במונגו
MONGO_PASS=   // הסיסמה
MONGO_SERVER= // כתובת הקלאסטר
PRIVATE_KEY=  // מפתח לטוקן
```

## רשימת ניתובים (Routes)

### משתמשים /user

- POST /user/register - הרשמה
- POST /user/login - התחברות (מחזיר טוקן)
- GET /user/ - כל המשתמשים (צריך טוקן)
- GET /user/:id - משתמש לפי ID (צריך טוקן)

### סרטים /movie

- GET /movie/ - לראות את כל הסרטים
- GET /movie/:id - סרט ספציפי לפי קוד
- POST /movie/ - להוסיף סרט (צריך טוקן)
- PUT /movie/:id - לעדכן סרט (צריך טוקן)
- DELETE /movie/:id - למחוק סרט (צריך טוקן)

### השכרות /rental

- GET /rental/ - רשימת השכרות (צריך טוקן)
- GET /rental/user/:userName - השכרות של משתמש ספציפי (צריך טוקן)
- POST /rental/ - לבצע השכרה (צריך טוקן)
- PUT /rental/return/:id - להחזיר סרט (צריך טוקן)

## איך להשתמש בטוקן?

בניתובים שרשום עליהם "צריך טוקן", צריך להוסיף ב-Postman תחת Authorization:
בסוג לבחור Bearer Token ולהדביק את הטוקן שקיבלתם ב-Login.

## דוגמאות ל-JSON (לשימוש בפוסטמן)

הרשמה:
```json
{ "userName": "tomer", "pass": "1234", "fullName": "Tomer" }
```

הוספת סרט:
```json
{ "mid": 1, "title": "The Matrix", "genre": "Action", "year": 1999, "price": 15, "copies": 3 }
```

השכרת סרט:
```json
{ "userName": "tomer", "mid": 1 }
```
