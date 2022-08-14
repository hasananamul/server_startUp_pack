import mongoose from "mongoose";

//User schema
const userSchema = mongoose.Schema({
      name : {
            type : String,
            required : true,
            trim : true
      },
      email : {
            type : String,
            required : true,
            trim : true,
            unique :true
      },
      number : {
            type : Number,
            required : true,
            trim : true,
            unique : true
      },
      age : {
            type : Number,
            required : true,
      },
      gender : {
            type : String,
      },
      userName : {
            type : String,
            required : true,
            trim : true,
            unique : true
      },
      password : {
            type : String,
            required : true,
            trim : true
      },
      photo : {
            type : String
      },
      isAdmin : {
            type : Boolean,
            default : false
      },
      status : {
            type : Boolean,
            default : true
      },
      trash :{
            type : Boolean,
            default : false
      }

},{timestamps : true})



export default mongoose.model("User", userSchema)