import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    FormControl, FormControlLabel,
    FormLabel, Radio,
    RadioGroup, Stack,
    Typography
} from "@mui/material";
import questions from "../Data/questions.json"
import {TestQuestionModel} from "../Model/TestQuestionModel.ts";


export function ResultPage(){
    return(
        <>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography>
                            Number of Question :
                        </Typography>
                        <Typography>Answer Correct : </Typography>
                        <Typography>Percentage : </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            {questions.map(answer=>(
                <Results {...answer}/>
            ))}
        </>
    )
}

export function Results({id, answers, correctAnswerId, text, picture} : TestQuestionModel){
    return(
        <Stack flex="flex" direction="row" spacing={{xs:1, sm:1, lg:4}} justifyContent="space-evenly " alignItems="center" >
            <Card style={{display:"flex" , justifyContent:"center", alignItems:"center"}} variant="outlined" sx={{width : 600, height: "auto", my : 20}} >
                <CardActionArea >
                    {picture &&
                        <CardMedia
                            component="img"
                            height="140"
                            image={picture}
                        />
                    }
                    <CardContent sx={{padding:"20px"}}>
                        <Typography variant="h6">{text}</Typography>
                        <Typography flex="flex" justifyContent="center" flexDirection="column" alignItems="center" width="auto">
                            <RadioGroup sx={{display : "flex", flexDirection:"row", alignItems: "center" }}>
                                <Radio  value="A" checked={correctAnswerId==="A"}/>
                                <label>{answers.A.text}</label>
                            </RadioGroup>
                            <RadioGroup sx={{display : "flex", flexDirection:"row", alignItems: "center", }}>
                                <Radio name={answers.B.text} value="B" checked={correctAnswerId==="B"}/>
                                <label>{answers.B.text}</label>
                            </RadioGroup>
                            <RadioGroup sx={{display : "flex", flexDirection:"row", alignItems: "center", }}>
                                <Radio name={answers.C.text} value="C" checked={correctAnswerId==="C"}/>
                                <label>{answers.C.text}</label>
                            </RadioGroup>
                            <RadioGroup sx={{display : "flex", flexDirection:"row", alignItems: "center", }}>
                                <Radio name={answers.D.text} value="D" checked={correctAnswerId==="D"}/>
                                <label>{answers.D.text}</label>
                            </RadioGroup>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Stack>
    )
}