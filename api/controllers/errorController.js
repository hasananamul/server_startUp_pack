//Error controller 
const errorController = (status, msg) => {
      let err = new Error();
      err.message = msg
      err.stasus = status
      return err
}

//Export error controller 
export default errorController;