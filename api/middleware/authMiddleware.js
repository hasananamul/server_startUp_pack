import errorController from "../controllers/errorController.js";
import jwt_token from "jsonwebtoken"

//User authiontication middleware 
export const authMiddleware = (req, res, next) => {
      const token = req.cookies.access_token;

      //Ckeck token
      if(!token){
            return next(errorController(401, "User not authonticate !"))
      }
      //Verify token      
      const login_user = jwt_token.verify(token, process.env.TOKEN);

      //Not valid user 
      if(!login_user){
            return next(errorController(401, "User not valid !"))
      }

      //Valid user 
      if(login_user){
            req.user = login_user
            next()      
      }
}