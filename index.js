
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import getConnection from './utils/get_connection.js';
import errorHandler from './middlewares/error_handler.js';  



const app = express();
const corsOptions = cors();
const cookieParserMiddleware = cookieParser();


app.use(cors())
app.use(express.json())
app.use(cookieParserMiddleware)
app.use(express.urlencoded({ extended: false }))


app.use(errorHandler);
getConnection();


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});