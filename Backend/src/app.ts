import "dotenv/config"
import express, {Request, Response,NextFunction} from 'express'
import docRouter from "./Routes/Document"
import morgan from "morgan"
import createHttpError, {isHttpError} from "http-errors";
import cors from "cors"
import bodyParser from "body-parser";

const app = express();

app.use(morgan("dev"))

app.use(cors());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json())

app.use("/api/doc", docRouter)

app.use((req, res, next)=>{
    next(createHttpError(404, "Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error : unknown, req :Request, res : Response, next : NextFunction)=>{
    console.error(error);
    let errorMessage = "An unknown error";
    let statusCode = 500
    if(isHttpError(error)){
        statusCode = error.status
        errorMessage = error.message
    }
    res.status(statusCode).json({error : errorMessage})
})

export default app