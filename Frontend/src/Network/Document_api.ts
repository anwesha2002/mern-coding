import {DocumentModel} from "../Model/DocumentModel.ts";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {Simulate} from "react-dom/test-utils";
import {json} from "react-router-dom";

async function fetchData(input : RequestInfo, init? : RequestInit){
    const response  = await fetch(input, init)
        if(response.ok){
            return response
        }else{
            const errorBody = await  response.json();
            const errorMessage = errorBody.error;
            throw Error(errorMessage)
        }

}

export async function fetchDoc() : Promise<DocumentModel[]>{
    const response = await fetchData("http://localhost:5000/api/doc", {method : "GET"})
    return response.json()
}

export interface DocumentInput {
    mobile : string,
    doc_image : string,
    photograph : string,
    age : number,
    gender : string
    disability : boolean
}

export async function createDoc(doc : DocumentInput) :Promise<DocumentModel>{
    const formData = new FormData();
    formData.append("photograph", doc.photograph[0])
    // formData.append("mobile", doc.mobile)
    formData.append("doc_image", doc.doc_image)
    // formData.append("age", JSON.stringify(doc.age))
    // formData.append("gender", doc.gender)
    // formData.append("disability", JSON.stringify(doc.disability))

    const config = {
        headers : { 'Content-Type' : 'multipart/form-data'}
    }
    const data = {...formData, age : doc.age, disability : doc.disability, gender : doc.gender, mobile : doc.mobile}

    const response = await axios.post('http://localhost:5000/api/doc', data, config)
    return response.data

    // const response = await fetch("http://localhost:5000/api/doc",
    //     {
    //     method : "POST",
    //     headers : {
    //         // Accept: 'application/json',
    //         'Content-Type': ' application/json',
    //     },
    //     body : JSON.stringify(doc),
    // });
    //return response.json()
}