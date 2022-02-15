import React, { Component } from 'react';
import { Box, Button, Card, Typography } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import '../App.css'
import { SportsEsportsTwoTone } from '@mui/icons-material';


const DifficultyEnum = {
    Easy: 'easy',
    Medium: 'medium',
    Hard: 'hard'
}
class StartPage extends Component {

    getScore() {
        return localStorage.getItem('score') || 0
    }

    getDifficultyLevel() {
        const scoreValue = this.getScore()
        if ( scoreValue > 250) {
            return DifficultyEnum.Hard
        } else if (scoreValue > 100) {
            return DifficultyEnum.Medium
        } else {
            return DifficultyEnum.Easy
        }
    }

    checkCurrentDifficulty = (difficulty) => {
        if (this.getDifficultyLevel() === difficulty) {
            return true
        }
        return false
    }

    resetScore = () => {
        localStorage.setItem('score', 0)
        window.location.reload();
    }

    render() {
        return (
            <>
                <Box className="centerContent" mt={10}>
                    <Box m="auto" className='centerText'>
                        <Typography variant="h2" mb={5}>
                            Play Scramble Word Game
                        </Typography>

                        <Button variant="outlined" size="medium" sx={{ m: 3 }}
                            disabled={!this.checkCurrentDifficulty(DifficultyEnum.Easy)}
                            startIcon={this.checkCurrentDifficulty(DifficultyEnum.Easy) && <SportsEsportsTwoTone />}
                        >
                            Easy
                        </Button>

                        <Button variant="outlined" size="medium" sx={{ m: 3 }}
                            disabled={!this.checkCurrentDifficulty(DifficultyEnum.Medium)}
                            startIcon={this.checkCurrentDifficulty(DifficultyEnum.Medium) && <SportsEsportsTwoTone />}
                        >
                            Meduim
                        </Button>

                        <Button variant="outlined" size="medium" sx={{ m: 3 }}
                            disabled={!this.checkCurrentDifficulty(DifficultyEnum.Hard)}
                            startIcon={this.checkCurrentDifficulty(DifficultyEnum.Hard) && <SportsEsportsTwoTone />}
                        >
                            Hard
                        </Button>

                        <Button variant="contained" size="large" sx={{ m: 3 }}
                            startIcon={<RestartAltIcon />} color="error"
                            onClick={this.resetScore}
                        >
                            Reset
                        </Button>

                        <br />
                        <br />
                        <Button variant="contained" size="large" startIcon={<PlayCircleOutlineIcon></PlayCircleOutlineIcon>} onClick={this.props.playGame}>Play</Button>

                        <Typography variant="h3" sx={{ m: 5 }}>
                            Your Score: {localStorage.getItem('score') || 0}
                        </Typography>

                        <Card variant="outlined">
                            <Typography variant="h5" sx={{ m: 5 }}>
                                <em>
                                    Note: Get proper score to upgrade your level.
                                </em>
                            </Typography>
                            <Typography variant="h5" sx={{ m: 5 }}>
                                Easy: 0 - 100
                                <br />
                                Medium: 100 - 250
                                <br />
                                Hard: 250 - 500
                            </Typography>
                        </Card>
                    </Box>

                </Box>
            </>
        );
    }
}

export default StartPage;