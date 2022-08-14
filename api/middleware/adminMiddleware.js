import errorController from "../controllers/errorController.js";
import jwt_token from "jsonwebtoken"

//User authiontication middleware 
export const adminMiddleware = (req, res, next) => {
      try {
            const user_token = req.cookies.user_access_token;
            const student_token = req.cookies.student_access_token;

      //Ckeck token
      if(user_token || student_token){
            //Verify token      
            const login_user = jwt_token.verify(user_token && student_token, process.env.TOKEN);
            //Not valid user 
            if(!login_user){
                  return next(errorController(401, "Admin not valid !"))
            }else{
            //Not valid admin 
            if(!login_user.isAdmin){
                  return next(errorController(401, "Only admin can access this features !"))
            }else{
            //Valid admin
                  req.user = login_user
                  next()
            }

            }
      }else{
            return next(errorController(401, "Admin not authonticate !"))
      }
      } catch (error) {
            next(error)
      }
}