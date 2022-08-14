import errorController from "../controllers/errorController.js";
import jwt from "jsonwebtoken"

//User midleware authiontication
export const userMiddleware = (req, res, next) => {
      try {
            //Check token
      const token = req.cookies.user_access_token;

      //If token tot found
      if(!token){
            next(errorController(401, "User token not found"))
      }

      //Verify token
      const valid_user = jwt.verify(token, process.env.TOKEN)

      //If token not verifyed
      if(!valid_user){
            next(errorController(401, "Invalid user token"))
      }

      if(valid_user.id !== req.params.id){
            next(errorController(401, "You are not abble to access other users !"))
      }

      if(valid_user){
            req.user = valid_user
            next()
      }
      } catch (error) {
            next(error)
      }

}