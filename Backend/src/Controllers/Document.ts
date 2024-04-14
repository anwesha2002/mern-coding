import DocumentModel from "../Models/UserDocument";
import express, {NextFunction, raw, RequestHandler} from "express";
import createHttpError from "http-errors";
import mongoose, {Expression} from "mongoose";
import multer, {Multer} from "multer";
import { v4 as uuidv4 } from 'uuid';
import * as datasource from "../DataSource/ImageDataSource"
//import * as path from "path";
import path from "path";
import * as fs from "fs";
import {profile} from "../DataSource/ImageDataSource";
// import fs from "fs"
// import Exp = module

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

interface DocProps {
    mobile? : string,
    age? : number,
    photograph? : string ,
    doc_image? : string,
    gender? : string,
    disability? : boolean
}

interface fileprops{
    doc_image : Express.Multer.File
    photograph : Express.Multer.File
}

async function entries(obj : Express.Multer.File ){
    const URL =`data:${obj?.mimetype};base64,`
    const filepath = obj && uuidv4() + '-' + Date.now() + path.extname(obj.originalname)
    return await datasource.profile(obj,URL, filepath)
}

async function fields(obj : Express.Multer.File[]  ){
    return obj.map(async (object)=>{
        return await entries(object)
    })
}



export const createDoc : RequestHandler<unknown, unknown, DocProps, unknown> = async (req, res  , next )  => {

    const files = req.files as Array<Express.Multer.File>

    // files.forEach((file)=>{
    //
    // })



    // const URL = `data:${files?.mimetype};base64,`
    // const filepath = file && uuidv4() + '-' + Date.now() + path.extname(file.originalname)



    //const docimage = req.body.doc_image


    try {

        // let doc_image : string  =""
        // let photograph : string = ""

         let image : object = {}
        let document : object = {}


        Object.values(files).forEach(file=> {
            image = Object.values(file).find(val => val.fieldname === "photograph")
        })
        Object.values(files).forEach(file=>{
            document = Object.values(file).find(val=> val.fieldname === "doc_image")
        })




         console.log("img : " + image)
         //console.log("doc : " + document)


            const mobile = req.body.mobile;
            // const doc_image =   await entries(image);
            // const photograph =  await entries(document);
            const age = req.body.age;
            const gender = req.body.gender;
            const disability = req.body.disability;
            if(!mobile || !age || !gender || !disability){
                next(createHttpError(400,"Fill all the field"))
            }
            const newDoc = await DocumentModel.create({
                mobile : mobile,
                // doc_image : doc_image,
                // photograph : photograph,
                age : age,
                gender : gender,
                disability : disability
            })
            res.status(201).json(newDoc)




            Object.entries(files).forEach( ([key,value]) => {
                //console.log(value)

                let doc_image : string= ""
                let photograph : string = ""

                // const object  = Object.values(value)
                //
                // const promises = object.map(async (obj)=>( await entries(obj)))
                //
                // Promise.all(promises)


                // res.then((doc)=>{
                //      doc.map(document=>{
                //          doc_image = document
                //     })
                // })
                //
                // console.log(doc_image)


                // if(key === "doc_image"){
                //       object.forEach(async (doc)=>{
                //            doc_image =  await entries(doc)
                //           console.log("doc : " + doc_image)
                //       })
                //     console.log("doc2 : " + doc_image)
                // }




                // if(key === "photograph"){
                //     object.map(async (image)=>{
                //         return photograph =   await fields(image)
                //     })
                // }


                //( async (obj)  =>{

                    // if(obj.fieldname == "doc_image"){
                    //     doc_image = await entries(obj)
                    // }else{
                    //     photograph = await entries(obj)
                    // }



                      //const photograph = key === "photograph" &&  await entries(obj)

                      //console.log(photograph)
                      // console.log("doc : " + doc_image)
                      // console.log("photo :  " + photograph)


                    // const doc_image = obj.fieldname === "doc_image" &&  await datasource.profile(obj,URL, filepath)
                      //   // console.log("doc" + doc_image)
                      //
                      //   const photograph= obj.fieldname === "photograph" && await datasource.profile(obj,URL, filepath)
                        // console.log("photo" + photograph)

                })
            // })




        // const photographSource = await datasource.profileImage(file,URL,filepath)
        // const docSource = await datasource.profileImage(file,URL,filepath)






        //res.status(201).json(newDoc)
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

// export const updateDoc : RequestHandler<updatedDocIdParams, unknown, updatedDocProps, unknown> = async (req,res, next) => {
//     const docId = req.params.docId;
//
//     const newMobile = req.body.mobile;
//     const newDoc_image = req.body.doc_image;
//     const newPhotograph = req.body.photograph;
//     const newAge = req.body.age;
//     const newGender = req.body.gender;
//     const newDisability = req.body.disability;
//     try {
//         if(!mongoose.isValidObjectId(docId)){
//             throw createHttpError(400, "Invalid doc Id");
//         }
//         if(!newMobile || !newDoc_image || !newPhotograph || !newAge || !newGender || !newDisability){
//             throw createHttpError(400,"Fill all the field")
//         }
//
//         const doc = await DocumentModel.findById(docId).exec()
//
//         if(!doc){
//             throw createHttpError(404, "doc not found")
//         }
//
//         doc.mobile = newMobile;
//         doc.doc_image = newDoc_image;
//         doc.photograph = newPhotograph;
//         doc.age = newAge;
//         doc.gender = newGender;
//         doc.disability = newDisability;
//
//         const updateDpc = await doc.save()
//
//         res.status(201).json(updateDpc)
//     }catch (err){
//         next(err)
//     }
// }

