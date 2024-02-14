import DocumentModel from "../Models/UserDocument";
import {raw, RequestHandler} from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import multer  from "multer";
import { v4 as uuidv4 } from 'uuid';
import * as path from "path";
import sharp from "sharp";
import fs from "fs"

export const getDoc : RequestHandler = async  (req, res, next) => {
    try {
        const doc = await DocumentModel.find().exec();
        res.status(200).json(doc)
    }catch (err){
        next(err);
    }
}

export const getDocById : RequestHandler = async (req, res, next) => {
    const docId = req.params.docId

    try {
        if(!mongoose.isValidObjectId(docId)){
             throw createHttpError(400, "Invalid doc Id");
        }
        const doc = await DocumentModel.findById(docId).exec();

        if(!doc){
             throw createHttpError(404, "document not found");
        }
        res.status(200).json(doc)
    }catch (err){
        next(err)
    }
}

// const storage = multer.diskStorage({
//     destination : (req, file, cb) =>{
//         cb(null, '/images')
//     },
//    filename : (req, file, cb) =>{
//         cb(null, uuidv4() +'-' + Date.now() + path.extname(file.originalname))
//     }
// })
//
// // const fileFilter  = (req, file, cb)  => {
// //     const allowedFileTyope = ['image/jpeg', 'image/jpg', 'image/png'];
// //     if (allowedFileTyope.includes(file.mimetype)){
// //         cb(null, true)
// //     }else {
// //         cb(null,false)
// //     }
// // }
//
// export const upload = multer({ storage : storage})

interface DocProps {
    mobile? : string,
    doc_image : string,
    photograph :  string,
    age? : number,
    gender? : string,
    disability? : boolean
}

async function saveImage(image : Express.Multer.File, path : string){
   await sharp(image.buffer)
       .toFile(path)
}

export const createDoc : RequestHandler<unknown, unknown, DocProps, unknown> = async (req, res, next) => {
    const URL = req.protocol + '://' + req.get("host");




    const img = fs.readFileSync(req.file.path);
    const encode_img = img.toString('base64')
    const final_img = {
        contentType : req.file?.mimetype,
        image : new Buffer (encode_img,'base64')
    }

    const docimage = req.body.doc_image

    console.log(req.file)

    const mobile = req.body.mobile;
    const doc_image =   URL + '/images/' + uuidv4();
    const photograph = URL + '/images/' + uuidv4();
    const age = req.body.age;
    const gender = req.body.gender;
    const disability = req.body.disability;
    try {
        if(!mobile || !doc_image || !photograph || !age || !gender || !disability){
            next(createHttpError(400,"Fill all the field"))
        }
        const newDoc = await DocumentModel.create({
            mobile : mobile,
            doc_image : final_img,
            photograph : final_img,
            age : age,
            gender : gender,
            disability : disability
        })
        res.status(201).json(newDoc)
    }catch (err){
        next(err)
    }
}

interface updatedDocIdParams {
    docId : string
}

interface updatedDocProps {
    mobile? : string,
    doc_image? : string,
    photograph? : string,
    age? : number,
    gender? : string,
    disability? : boolean
}

export const updateDoc : RequestHandler<updatedDocIdParams, unknown, updatedDocProps, unknown> = async (req,res, next) => {
    const docId = req.params.docId;

    const newMobile = req.body.mobile;
    const newDoc_image = req.body.doc_image;
    const newPhotograph = req.body.photograph;
    const newAge = req.body.age;
    const newGender = req.body.gender;
    const newDisability = req.body.disability;
    try {
        if(!mongoose.isValidObjectId(docId)){
            throw createHttpError(400, "Invalid doc Id");
        }
        if(!newMobile || !newDoc_image || !newPhotograph || !newAge || !newGender || !newDisability){
            throw createHttpError(400,"Fill all the field")
        }

        const doc = await DocumentModel.findById(docId).exec()

        if(!doc){
            throw createHttpError(404, "doc not found")
        }

        doc.mobile = newMobile;
        doc.doc_image = newDoc_image;
        doc.photograph = newPhotograph;
        doc.age = newAge;
        doc.gender = newGender;
        doc.disability = newDisability;

        const updateDpc = await doc.save()

        res.status(201).json(updateDpc)
    }catch (err){
        next(err)
    }
}

