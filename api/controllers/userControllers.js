import bcrypt from "bcryptjs"
import User from "../models/userModel.js";
import errorController from "./errorController.js";
import jwt from "jsonwebtoken";

/**
 * @access public 
 * @route /user
 * @method GET
 */
export const getAllUser = async (req, res, next) => {
      try {
            const users = await User.find()
            users.length === 0 ? next(errorController(404, "This collection has no data")) : res.status(200).json(users)   
      } catch (error) {
            next(error)
      }    
}

/**
 * @access public 
 * @route /User/:id
 * @method GET
 */
export const getSingleUser = async (req, res, next) => {
      try {
            const id = req.params.id;
            const singleData = await User.findById(id);
            !singleData ? next(errorController(404, "Data not found")) : res.status(200).json(singleData);
      } catch (error) {
            next(error)
      }
}

/**
 * @access public 
 * @route /User
 * @method POST
 */
export const createUser = async (req, res, next) => {
      try {
            const salt = await bcrypt.genSalt(10)
            const has_pass = await bcrypt.hash(req.body.password, salt)
            await User.create({...req.body, password : has_pass})
      res.send("User data created successfully")
      } catch (error) {
            next(error)
      }
}

/**
 * @access public 
 * @route /User/id
 * @method PUT/PATCH
 */
export const editUser = async (req, res, next) => {
      try {
            const {id} = req.params;
            await User.findByIdAndUpdate(id, {...req.body}, {new : true})
            res.send("User data update successful")
      } catch (error) {
            next(error)
      }
}

/**
 * @access public 
 * @route /user/id
 * @method DELETE
 */
export const deleteUser = async (req, res, next) => {
      try {
            const id = req.params.id;
            await User.findByIdAndDelete(id)
            res.send("Data deleted successful")
      } catch (error) {
            next(error)
      }
}

/**
 * @access public 
 * @route /User
 * @method POST
 */
export const registerUser = async (req, res, next) => {
      try {

            res.send("User register page")
            const salt = await bcrypt.genSalt(10)
            const has_pass = await bcrypt.hash(req.body.password, salt)
            await User.create({...req.body, password : has_pass})
      res.send("User data created successfully")
      } catch (error) {
            next(error)
      }
}


/**
 * @access public 
 * @route /User
 * @method POST
 */
export const loginUser = async (req, res, next) => {
      try {
            const {email, password} = req.body;
            const validUser = await User.findOne({email});

            if (!validUser) {
                  res.send("User email not found")
            } 

            // console.log(validUser.password, password);

                  const check_pass = await bcrypt.compare(password, validUser.password)
                  if (!check_pass) {
                  res.send("Wrong passwordm!")
            } 
            else {
                  const jwt_token = jwt.sign({id : validUser.id, isAdmin : validUser.isAdmin}, process.env.TOKEN, {expiresIn : "1d"})
                  const {password, isAdmin, ...user_info} = validUser._doc;
                  res.cookie("user_access_token", jwt_token).status(200).json({
                        token : jwt_token,
                        user : user_info
                  })                        
            }                  
      } catch (error) {
            next(error)
      }
}

