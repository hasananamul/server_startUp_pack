import Student from "../models/Students.js";
import bcrypt from "bcryptjs";
import errorController from "./errorController.js";
import jwt from "jsonwebtoken"

/**
 * @access public 
 * @route /student
 * @method GET
 */
export const getAllStudents = async (req, res, next) => {
      try {
            const students = await Student.find()
            students.length === 0 ? res.send(errorController(404, "This collection has no data")) : res.status(200).json(students)   
      } catch (error) {
            next(error)
      }    
}

/**
 * @access public 
 * @route /student/:id
 * @method GET
 */
export const getSingleStudent = async (req, res, next) => {
      try {
            const id = req.params.id;
            const singleData = await Student.findById(id);
            !singleData ? next(errorController(404, "Data not found")) : res.status(200).json(singleData);
      } catch (error) {
            next(error)
      }
}

/**
 * @access public 
 * @route /student
 * @method POST
 */
export const createStudent = async (req, res, next) => {
      try {
            const salt = await bcrypt.genSalt(10)
            const has_pass = await bcrypt.hash(req.body.password, salt)
            await Student.create({...req.body, password : has_pass})
      res.send("Student data created successfully")
      } catch (error) {
            next(error)
      }
}

/**
 * @access public 
 * @route /student/id
 * @method PUT/PATCH
 */
export const editStudent = async (req, res, next) => {
      try {
            const {id} = req.params;
            await Student.findByIdAndUpdate(id, {...req.body}, {new : true})
            res.send("Student data update successful")
      } catch (error) {
            next(error)
      }
}

/**
 * @access public 
 * @route /student/id
 * @method DELETE
 */
export const deleteStudent = async (req, res, next) => {
      try {
            const id = req.params.id;
            await Student.findByIdAndDelete(id)
            res.send("Data deleted successful")
      } catch (error) {
            next(error)
      }
}



/**
 * @access public 
 * @route /registe_rstudent
 * @method POST
 */
export const registerStudent = async (req, res, next) => {
      try {
            const salt = await bcrypt.genSalt(10)
            const has_pass = await bcrypt.hash(req.body.password, salt)
            await Student.create({...req.body, password : has_pass})
      res.send("Student data created successfully")
      } catch (error) {
            next(error)
      }
}


/**
 * @access public 
 * @route /Student_login
 * @method POST
 */
export const loginStudent = async (req, res, next) => {
      try {
            const {email, password} = req.body;
            const validStudent = await Student.findOne({email});

            if (!validStudent) {
                  res.send("Student email not found")
            } 

                  const check_pass = await bcrypt.compare(password, validStudent.password)
                  if (!check_pass) {
                  res.send("Wrong passwordm!")
            } 
            else {
                  const jwt_token = jwt.sign({id : validStudent.id, isAdmin : validStudent.isAdmin}, process.env.TOKEN, {expiresIn : "1d"})
                  const {password, isAdmin, ...student_info} = validStudent._doc;
                  res.cookie("student_access_token", jwt_token).status(200).json({
                        token : jwt_token,
                        user : student_info
                  })                        
            }                  
      } catch (error) {
            next(error)
      }
}

