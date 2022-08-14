import errorController from "../controllers/errorController.js";
import jwt_token from "jsonwebtoken"

//Student authiontication middleware 
export const studentMiddleware = (req, res, next) => {
      try {
            const token = req.cookies.student_access_token;

      //Ckeck token
      if(!token){
            return next(errorController(401, "Student not authonticate !"))
      }
      //Verify token      
      const login_student = jwt_token.verify(token, process.env.TOKEN);

      //Not valid Student 
      if(!login_student){
            return next(errorController(401, "Student not valid !"))
      }

      //Own login access 
      if(login_student.id !== req.params.id){
            return next(errorController(401, "You can't access onters student !"))
      }

      //Valid Student 
      if(login_student){
            req.user = login_student
            next()      
      }
      } catch (error) {
            next(error)
      }
}