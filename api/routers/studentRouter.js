import express from "express";
import {createStudent, deleteStudent, editStudent, getAllStudents, getSingleStudent} from "../controllers/studentControllers.js";
import {adminMiddleware} from "../middleware/adminMiddleware.js";
import {studentMiddleware} from "../middleware/studentMiddleware.js";
const router = express.Router();


//Routing all controllers
router.route("/").get( adminMiddleware, getAllStudents).post(adminMiddleware, createStudent);
router.route("/:id").get(studentMiddleware, getSingleStudent).put(studentMiddleware, editStudent).delete(studentMiddleware, deleteStudent);

export default router