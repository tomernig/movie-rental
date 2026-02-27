const Movie=require('../models/movie');
let obj={
    getAllMovies:(req,res)=>{
        // מבצעים חיפוש של כל הסרטים בטבלת סרטים
        Movie.find().then((data)=>{
            return res.status(200).json(data);
        });
    },
    getMovieById:(req,res)=>{
        const id=req.params.id;// שמירת הפרמטר איידי שנשלח לנקודת הקצה בתוך משתנה
        Movie.find({mid:id}).then((movie)=>{
            return res.status(200).json(movie);
        });
    },
    updateMovieById:(req,res)=>{
        const mid=req.params.id;// שמירת הפרמטר איידי שנשלח לנקודת הקצה
        Movie.updateOne({mid:mid},req.body).then((movie)=>{
            return res.status(200).json(movie);
        });
    },
    deleteMovieById:(req,res)=>{
        const mid=req.params.id;
        Movie.deleteOne({mid}).then((movie)=>{
            return res.status(200).json(movie);
        });
    },
    addMovie:(req,res)=>{
        const mid=req.body.mid;
        // לפני הוספת סרט חדש, נבדוק האם קיים סרט עם אותו קוד סרט
        Movie.find({mid:mid}).then((data)=>{
            if(data.length>0)// במידה וקיים סרט עם קוד הסרט שנשלח
            {// הודע שלא ניתן להוסיף את הסרט
                return res.status(200).json({message:`movie id ${mid} already exist`});
            }
            else{
                Movie.create(req.body).then((movie)=>{
                    return res.status(200).json(movie);// הוספת הסרט לבסיס הנתונים
                });
            }
        });
    }
};

module.exports=obj;
