import {SideBar} from "../Components/SideBar.tsx";
import {Box, Divider} from "@mui/material";

export function HomePage(){
    return(
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'background.paper',
                color: 'text.secondary',
                '& svg': {
                    m: 1,
                },
            }}
        >
            <SideBar/>
            <Divider orientation="vertical" variant="inset" flexItem/>
            <div style={{minHeight:"screen"}}>Home</div>
        </Box>
    )
}