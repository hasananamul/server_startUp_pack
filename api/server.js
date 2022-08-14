import express from "express";
import dotenv from "dotenv";
import "colors"
import studentRouter from "./routers/studentRouter.js";
import userRouter from "./routers/userRouter.js"
import {connectionDB} from "./config/db.js";
import errorHandeler from "./middleware/errorHandeler.js";
import {loginUser, registerUser} from "./controllers/userControllers.js";
import cookieParser from "cookie-parser"
import {loginStudent, registerStudent} from "./controllers/studentControllers.js";

//init env variable
dotenv.config();
const PORT = process.env.SERVER_PORT || 8000;

//Connection database
connectionDB();

//init express
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser())

//router
app.use("/student", studentRouter)
app.use("/user", userRouter)
app.post("/student/register_student", registerStudent)
app.post("/student/login_student", loginStudent)
app.post("/user/register", registerUser)
app.post("/user/login", loginUser)

//Express error handelaer
app.use(errorHandeler)

// Default error handelers
// app.use((err,req, res, next) => {
//       if(err){
//             if(err instanceof MulterError){
//                   res.status(500).send("There was an uploaded error !")
//             }else{
//                   res.status(500).send(err.message)
//             }
//       }else{
//             res.send("Success")
//       }
// })

app.listen(PORT, () => {
      console.log(` Server is runing on port ${PORT}`.america.bgWhite);
})

