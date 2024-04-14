import {Schema, InferSchemaType, model} from "mongoose";

const documentSchema = new Schema({
    mobile : { type : String, required : true },
    // doc_image : {  type : String, required : true },
    // photograph : { type : String, required : true },
    age : { type : Number, required : true },
    gender : { type : String , required : true},
    disability : {type : Boolean, required : true}
})

type Document = InferSchemaType<typeof documentSchema>

export default model<Document>("Document", documentSchema)