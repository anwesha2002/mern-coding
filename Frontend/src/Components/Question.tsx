import {TestQuestionModel} from "../Model/TestQuestionModel.ts";
import {
    CardActionArea,
    Card,
    CardMedia,
    CardContent,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup, FormControlLabel, Radio, Button
} from "@mui/material";
import {UseTest} from "../Context/quizzContext.tsx";
import { useEffect, useState} from "react";
import questions from "../Data/questions.json"

// import  Card from "@mui/material/Card";
// import  CardMedia from "@mui/material/CardMedia";
// import  CardContent from "@mui/material/CardContent";
// import  Typography from "@mui/material/Typography";

export function Question( { text, answers, correctAnswerId, picture} : TestQuestionModel){
    //const [answer, setAnswer] = useState<string>("")

    const {  setScore, score, index, setIndex } = UseTest()
    const [timer, setTimer] = useState<number>(10)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(true)
    const [answer, setAnswer] = useState<string[]>([])

    const [selected, setSelected] = useState<string>("")


    console.log(answer)
    console.log(correctAnswerId)



    function handleClick(e : any){
        e.preventDefault()
        if(questions.length !== index){
            setIndex(index+1)
        }
        setAnswer([])
        setSelected("")
        setIsSubmitted(false)
    }

    useEffect(() => {

        if(selected === correctAnswerId){
            setScore(score+1)
        }else {
            if(answer.length > 0){
                if(answer[answer.length-2] === correctAnswerId){
                    setScore(score-1)
                }
            }
        }

            // answer.map(ans=>{
            //     if(selected === correctAnswerId){
            //         if(!(answer.indexOf(correctAnswerId) < answer.length -1) && answer.indexOf(correctAnswerId) == answer.length){
            //                 setScore(score+1)
            //         }
            //     }else{
            //         if(answer.indexOf(correctAnswerId) == answer.length -2){
            //             setScore(score-1)
            //         }
            //     }
            // })


        // answer.map(ans=>{
        //     if(!answer.includes(correctAnswerId)){
        //         if (ans === correctAnswerId){
        //
        //         }
        //     }
        // })
    }, [selected]);



    useEffect(() => {

        const interval = setInterval(() => {
            if(isSubmitted){
                setTimer(timer-1)
                if(timer ==0){
                    if(questions.length !== index){
                        setIndex(index+1)
                    }
                    setAnswer([])
                    setSelected("")
                    setIsSubmitted(false)
                    return () => clearInterval(interval)
                }
            }
        }, 1000)

        return () => clearInterval(interval)

    });


    return(
        <>
            <Card style={{display:"flex" , justifyContent:"center", alignItems:"center"}} variant="outlined" sx={{maxWidth : 600, height: "auto"}} >
                <CardActionArea >
                    {picture &&
                        <CardMedia
                            component="img"
                            height="140"
                            image={picture}
                        />
                    }
                    <CardContent sx={{padding:"20px"}}>
                        <Typography variant="h6">{timer}</Typography>
                        <form onSubmit={handleClick}>
                            <FormControl >
                                <FormLabel sx={{fontSize:"25px"}}>
                                    {text}
                                </FormLabel>
                                <RadioGroup value={selected}  onChange={(e)=> {
                                    setSelected(e.target.value)
                                    setAnswer([...answer, e.target.value])
                                }}  sx={{mt:2}}>
                                    <FormControlLabel value="A" control={<Radio/>} label={answers.A.text}/>
                                    <FormControlLabel value="B" control={<Radio/>} label={answers.B.text}/>
                                    <FormControlLabel value="C" control={<Radio/>} label={answers.C.text}/>
                                    <FormControlLabel value="D" control={<Radio/>} label={answers.D.text}/>
                                </RadioGroup>
                                <Button variant="outlined" className="d-flex justify-content-center align-self-center" type="submit">submit</Button>
                            </FormControl>
                        </form>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}