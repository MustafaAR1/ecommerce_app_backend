import StringConstants from "../constants/string_constants.js";

const errorHandler = (error, req, res, next) => {

    const statusCode = error.statusCode || 500;
    const message = error.message || StringConstants.INTERNAL_SERVER_ERROR;  
    res.status(statusCode).json({ message:message });

};  

export default errorHandler;

