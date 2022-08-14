import express from "express";
import {createUser, deleteUser, editUser, getAllUser, getSingleUser} from "../controllers/userControllers.js";
import {adminMiddleware} from "../middleware/adminMiddleware.js";
import {userMiddleware} from "../middleware/userMiddleware.js";

const router = express.Router();


//Routing all controllers
router.route("/").get( adminMiddleware, getAllUser).post(userMiddleware, createUser);
router.route("/:id").get(userMiddleware, getSingleUser).put(userMiddleware,editUser).delete(userMiddleware,deleteUser);

export default router