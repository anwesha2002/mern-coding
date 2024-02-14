import {
    Button,
    Card, CardActionArea, CardActions, CardContent,
    FilledInput,
    FormControl, FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel, Grid,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import {createDoc, DocumentInput} from "../Network/Document_api.ts";
import {DocumentModel} from "../Model/DocumentModel.ts";

export function DocumentForm(){
    const  { register, handleSubmit, formState : {errors, isSubmitting} } = useForm<DocumentInput>()

    function onDocSubmit(input : DocumentModel){
        console.log(input)
    }

    async function onSubmit(input: DocumentInput) {
        try{
            await createDoc(input)
            //onDocSubmit(docRes)
            console.log(input)
        }catch (err){
            console.error(err)
            alert(err)
        }

    }

    return(
        <Card variant="outlined" sx={{p : 2, m : 5}}>
            <CardActionArea>
                <CardContent>
                    <form method="POST" encType="multipart/form-data" id="addDocument" onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup >
                            <FormControl>
                                <FormLabel>Upload your photo here</FormLabel>
                                <TextField
                                    type="file"
                                    error={!!errors.photograph}
                                    {...register("photograph", {required : "required"})}
                                />
                                <FormHelperText>
                                    {errors.photograph?.message}
                                </FormHelperText>
                            </FormControl>
                        </FormGroup>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormGroup>
                                    <FormControl>
                                        <FormLabel>Mobile Number</FormLabel>
                                        <TextField
                                            type="string"
                                            label="mobile"
                                            error={!!errors.mobile}
                                            {...register("mobile", {required : "required"})}
                                        />
                                        <FormHelperText>
                                            {errors.mobile?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={6}>
                                <FormGroup>
                                    <FormControl>
                                        <FormLabel>Age</FormLabel>
                                        <TextField
                                            type="number"
                                            label="Age"
                                            error={!!errors.age}
                                            {...register("age", {required : "required"})}
                                        />
                                        <FormHelperText>
                                            {errors.age?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <FormGroup>
                            <FormControl>
                                <FormLabel>Upload your proof document here</FormLabel>
                                <TextField
                                    type="file"
                                    error={!!errors.doc_image}
                                    {...register("doc_image", {required : "required"})}
                                />
                                <FormHelperText>
                                    {errors.doc_image?.message}
                                </FormHelperText>
                            </FormControl>
                        </FormGroup>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormGroup>
                                    <FormControl error={!!errors.gender}>
                                        <FormLabel>Gender</FormLabel>
                                        <RadioGroup sx={{display:"flex" , flexDirection : "row"}} {...register("gender", {required: "required"})}>
                                            <FormControlLabel control={<Radio/>} label="Female" value="female"/>
                                            <FormControlLabel control={<Radio/>} label="Male" value="male"/>
                                            <FormControlLabel control={<Radio/>} label="Others" value="others"/>
                                        </RadioGroup>
                                        <FormHelperText>
                                            {errors.gender?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={6}>
                                <FormGroup>
                                    <FormControl error={!!errors.disability}>
                                        <FormLabel>Disability</FormLabel>
                                        <RadioGroup sx={{display:"flex" , flexDirection : "row"}} {...register("disability", {required : "required"})}>
                                            <FormControlLabel control={<Radio/>} label="yes" value={true}/>
                                            <FormControlLabel control={<Radio/>} label="no" value={false}/>
                                        </RadioGroup>
                                        <FormHelperText>
                                            {errors.doc_image?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Button type="submit"  variant="outlined" form="addDocument" size="medium" color="success">Submit</Button>
            </CardActions>
        </Card>
    )
}