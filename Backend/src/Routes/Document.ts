import express from "express";
import * as DocController from "../Controllers/Document"
import multer from "multer";
import {v4 as uuidv4} from "uuid";
import path from "path";
import createHttpError from "http-errors";


const router = express.Router()

const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        if(file.fieldname === "photograph"){
            cb(null,'./images')
        }
        if(file.fieldname === "doc_image"){
            cb(null,'./document')
        }
    }
})


const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB limit
    },
    fileFilter(req, file, callback) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')
            callback(null, true)
        else
            callback(createHttpError(400, "File must be a png or jpeg"))
    }
})




// const fileFilter  = (req, file, cb)  => {
//     const allowedFileTyope = ['image/jpeg', 'image/jpg', 'image/png'];
//     if (allowedFileTyope.includes(file.mimetype)){
//         cb(null, true)
//     }else {
//         cb(null,false)
//     }
// }
//const upload = multer({storage : storage})



router.get("/", DocController.getDoc);

router.get("/:docId", DocController.getDocById);

router.post("/", upload.fields([{name: 'photograph'}, {name: 'doc_image'}]) ,  DocController.createDoc);

//router.patch("/:docId", DocController.updateDoc);

export default router