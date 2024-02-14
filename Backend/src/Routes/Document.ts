import express from "express";
import * as DocController from "../Controllers/Document"
//import {upload} from "../Controllers/Document";
import multer from "multer";
import {v4 as uuidv4} from "uuid";
import path from "path";


const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, 'images/')
    },
    filename : (req, file, cb) =>{
        cb(null, uuidv4() +'-' + Date.now() + path.extname(file.originalname))
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

  const upload = multer({ storage : storage})


const router = express.Router()

router.get("/", DocController.getDoc);

router.get("/:docId", DocController.getDocById);

router.post("/", upload.fields([{name : 'photograph'}, {name : 'doc_image'}])  ,  DocController.createDoc);

router.patch("/:docId", DocController.updateDoc);

export default router