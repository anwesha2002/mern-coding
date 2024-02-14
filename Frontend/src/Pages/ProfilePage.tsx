import {useEffect, useState} from "react";
import {DocumentModel} from "../Model/DocumentModel.ts";
import axios from "axios";
import {fetchDoc} from "../Network/Document_api.ts";
import {Avatar, Box, Card, Paper} from "@mui/material";
import {DocumentForm} from "../Components/DocumentForm.tsx";

export function ProfilePage(){
    const [doc, setDoc] = useState<DocumentModel[]>([])

    useEffect(() => {
            (async ()=>{
                try{
                    const docs = await fetchDoc()
                    setDoc(docs)
                }catch (err){
                    console.error(err);
                    alert(err);
                }
            })()
    }, []);

    {
        console.log(doc)
    }



    return(
        <>
            <DocumentForm/>
        {/*<Card >*/}
        {/*    <Box>*/}
        {/*        {doc.map(document =>*/}
        {/*        <h1>*/}
        {/*            {document.mobile}*/}
        {/*        </h1>*/}
        {/*        )}*/}
        {/*    </Box>*/}
        {/*</Card>*/}
        </>
    )
}