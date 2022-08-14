import mongoose from "mongoose";

export const connectionDB = async () => {
      try {
            await mongoose.connect(process.env.CONNECTION_STRING, () => {
                  console.log(`Database are connected`.bgBlue.black);
            })
      } catch (error) {
            console.log(error);            
      }
}