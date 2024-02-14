import {Question} from "./Question.tsx";
import questions from "../Data/questions.json"
import {useState} from "react";
import {Stack} from "@mui/material";
import {UseTest} from "../Context/quizzContext.tsx";
import {ResultPage} from "../Pages/ResultPage.tsx";
import {QuizzPage} from "../Pages/QuizzPage.tsx";


export function Test(){
    const [clicked, setClicked] = useState(false)
    //let index : number = 1
    const  { index } = UseTest()

    console.log(questions)
    console.log(questions.length)
    console.log(index)



    return(
        <>
            {questions.map((question)=>(
                question.id === index &&
                <Stack  sx={{height:"90vh", overflow:"hidden"}} flex="flex" direction="row" spacing={{xs:1, sm:1, lg:1}} justifyContent="center" alignItems="center">
                    <div><Question {...question} /></div>
                </Stack>
            ))}
        </>
    )
}