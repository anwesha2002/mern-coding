import {SideBar} from "../Components/SideBar.tsx";
import {Box, Divider, Typography} from "@mui/material";
import Stack from "@mui/material/Stack"
import {Question} from "../Components/Question.tsx";

export function HomePage(){
    return(
        <>
        {/*<SideBar/>*/}
        {/*    <Divider orientation="vertical" variant="inset" flexItem/>*/}
        {/*<Box*/}
        {/*    sx={{*/}
        {/*        display: 'flex',*/}
        {/*        alignItems: 'center',*/}
        {/*        bgcolor: 'background.paper',*/}
        {/*        color: 'text.secondary',*/}
        {/*        '& svg': {*/}
        {/*            m: 1,*/}
        {/*        },*/}
        {/*    }}*/}
        {/*>*/}


        {/*    <Stack spacing={2} style={{backgroundColor:"red"}}>*/}
        {/*        <Typography>home</Typography>*/}
        {/*    </Stack>*/}
        {/*    /!*<div style={{minHeight:"screen"}}>*!/*/}

        {/*    /!*</div>*!/*/}

        {/*</Box>*/}
            <Stack spacing={2} justifySelf="center" style={{backgroundColor:"red"}}>
                home
            </Stack>
        </>
    )
}