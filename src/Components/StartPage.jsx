import React, { Component } from 'react';
import { Box, Button, Typography } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import '../App.css'

class StartPage extends Component {
    state = {
        difficulty: 'easy'
    }

    render() {
        return (
            <>
                <Box display="flex" mt={10}>
                    <Box m="auto" mb={10}>
                        <Typography variant="h2">
                            Play Word Game
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex">
                    <Box m="auto" mb={5}>
                        <Button variant="outlined" size="medium" sx={{ m: 2 }}>Easy</Button>
                        <Button variant="outlined" size="medium" sx={{ m: 2 }}>Meduim</Button>
                        <Button variant="outlined" size="medium" sx={{ m: 2 }}>Hard</Button>
                    </Box>
                </Box>

                <Box display="flex">
                    <Box m="auto">
                        <Button variant="contained" size="large" startIcon={<PlayCircleOutlineIcon></PlayCircleOutlineIcon>} disabled={false}>Play</Button>
                    </Box>
                </Box>
            </>
        );
    }
}

export default StartPage;