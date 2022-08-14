//Express error handeler
const errorHandeler = (error, req, res, next) => {
      const status = error.status || 500;
      const message = error.message || "Unknown error";
      const stack = error.stack;
      return res.status(status).json({message,status,stack})
}

export default errorHandeler;