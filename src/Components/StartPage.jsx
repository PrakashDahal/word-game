import React, { Component } from 'react';
import { Box, Button, Typography } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import '../App.css'
import { SportsEsportsTwoTone } from '@mui/icons-material';

class StartPage extends Component {
    state = {
        difficulty: 'easy'
    }

    render() {
        return (
            <>
                <Box className="centerContent" mt={10}>
                    <Box m="auto" className='centerText'>
                        <Typography variant="h2">
                            Play Word Game
                        </Typography>

                        <Button variant="outlined" size="medium" sx={{ m: 2 }} startIcon={this.state.difficulty === 'easy' && <SportsEsportsTwoTone />}>
                            Easy
                        </Button>
                        <Button variant="outlined" size="medium" sx={{ m: 2 }} disabled>Meduim</Button>
                        <Button variant="outlined" size="medium" sx={{ m: 2 }} disabled>Hard</Button>

                        <Button variant="contained" size="large" startIcon={<PlayCircleOutlineIcon></PlayCircleOutlineIcon>} disabled={false} onClick={this.props.playGame}>Play</Button>
                    </Box>
                </Box>
            </>
        );
    }
}

export default StartPage;