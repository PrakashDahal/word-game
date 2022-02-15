import React, { Component } from 'react';
import { Alert, Box, Chip, Collapse, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import WordListComponent from './WordListComponenet';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import '../App.css'
const randomWords = require('random-words');

class GamePage extends Component {
    appricationRules = {
        5: 'Good One',
        6: 'Very Good',
        7: 'Fantastic',
        8: 'Amazing',
        9: 'Absolutely brilent'
    }

    state = {
        randomWord: this.getRandomWord(),
        currentWord: '',
        wordList: [],
        score: localStorage.getItem('score') || 0,
        timer: this.getTimerValue(),
        snackOpen: false,
        finalMessage: false
    }

    getRandomWord() {
        const word = randomWords({ exactly: 2, maxLength: 20 }).join('');
        return word.split('').sort(() => Math.floor(Math.random() * Math.floor(3)) - 1).join('')
    }

    handleEnter = (e) => {
        const enteredText = e.target.value.toLowerCase()
        this.setState({
            currentWord: enteredText
        })
    }

    checkWordExistence = (word) => {
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.title === 'No Definitions Found') {
                        this.handleOpenSnack('Word is invalid', 'warning')
                    } else {
                        const score = Number(this.state.score) + (word.length - 2)
                        this.appricateWork(word)
                        this.saveScores(score)
                        this.setState({
                            score: score
                        })
                    }
                },
                (error) => {
                    this.handleOpenSnack('Something went wrong', 'error')
                }
            )
    }

    saveScores = (score) => {
        localStorage.setItem('score', score);
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (!this.state.wordList.includes(this.state.currentWord)) {
            if (this.state.timer > 0 && this.state.currentWord.length > this.getDifficultyWordLength()) {
                if (this.isValidSubString(this.state.randomWord, this.state.currentWord)) {
                    this.checkWordExistence(this.state.currentWord)
                } else {
                    this.handleOpenSnack('Unmatching word', 'error')
                    const score = this.state.score > 0 ? Number(this.state.score) - 1 : 0
                    this.saveScores(score)
                    this.setState({
                        score: score
                    })
                }
                const word = [this.state.currentWord, ...this.state.wordList]
                this.setState({
                    wordList: word,
                    currentWord: ''
                })
            }
        } else {
            this.handleOpenSnack('Already Exists', 'warning')
        }
    }

    getTimerValue() {
        const scoreVal = localStorage.getItem('score') || 0
        if (scoreVal > 250) {
            return 30
        } else if (scoreVal > 100) {
            return 45
        } else {
            return 60
        }
    }

    decreaseTimer() {
        const timer = this.state.timer > 0 ? (this.state.timer - 1) : 0
        this.setState({
            timer: timer
        })
        if (timer <= 0) {
            this.resetState()
            clearInterval(this.timerID);
            this.props.finishGame()
        }
    }

    isValidSubString(mainText, subText) {
        if (subText) {
            let cloneMainText = mainText
            let validSubText = true
            subText.split('').forEach(letter => {
                if (cloneMainText.includes(letter)) {
                    cloneMainText = cloneMainText.replace(letter, '')
                } else {
                    validSubText = false
                }
            });
            return validSubText
        }
        return false
    }

    changeRandomWord = () => {
        this.setState({
            randomWord: this.getRandomWord()
        })
    }

    handleOpenSnack = (message, color = 'success') => {
        this.setState({
            snackOpen: true,
            currentWord: '',
            snackMessage: message,
            snackColor: color
        })
    }

    handleCloseSnack = () => {
        this.setState({
            snackOpen: false
        })
    }

    getDifficultyWordLength() {
        const scoreVal = localStorage.getItem('score') || 0
        if (scoreVal > 250) {
            return 4
        } else if (scoreVal > 100) {
            return 3
        }
        return 2
    }

    appricateWork(word) {
        if (word.length < 5) return
        const message = this.appricationRules[word.length] || this.appricationRules['9']
        this.handleOpenSnack(message)
    }

    componentDidMount() {
        if (this.state.timer > 0) {
            this.timerID = setInterval(
                () => this.decreaseTimer(),
                1000
            );
        } else {
            clearInterval(this.timerID);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    resetState() {
        this.setState({
            currentWord: '',
            wordList: [],
            score: localStorage.getItem('score') || 0,
            timer: 0,
            finalMessage: true
        })
    }

    render() {
        return (
            <>
                <Box mt={10} className="centerContent">
                    <Box m="auto" className='centerText'>

                        <Collapse in={this.state.finalMessage}>
                            <Alert variant="outlined" color='info'>
                                <strong>
                                    Well Done! &nbsp;&nbsp;
                                </strong>
                                You are few steps away
                            </Alert>
                        </Collapse>

                        <Typography variant="h2" sx={{ m: 4 }}>
                            Your word is:&nbsp;
                            <Box fontWeight='fontWeightMedium' display='inline'>
                                {this.state.randomWord}
                            </Box>

                            <IconButton color="primary" aria-label="Change Word" onClick={this.changeRandomWord} size="large" sx={{ m: 2 }} disabled={this.state.timer <= 0}>
                                <RestartAltIcon fontSize='large' />
                            </IconButton>
                        </Typography>

                        <Typography variant='h4' sx={{ m: 4 }}>
                            Score: {this.state.score} ,
                            Timer: <Chip label={this.state.timer} size="large" sx={{ p: 2 }} />
                        </Typography>

                        <form onSubmit={this.handleSubmit} sx={{ m: 4 }}>
                            <TextField id="matchingWords" label="Matching word" variant="outlined" size='large'
                                onChange={this.handleEnter} value={this.state.currentWord} autoComplete="off" disabled={!this.state.timer > 0} autoFocus
                                helperText={`More than ${this.getDifficultyWordLength()} words are valid`}
                            />
                        </form>
                        <Box mt={2}>
                            <WordListComponent wordList={this.state.wordList} />
                        </Box>
                    </Box>
                </Box>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={1000}
                    open={this.state.snackOpen}
                    onClose={this.handleCloseSnack}
                >
                    <Alert variant="filled" onClose={this.handleCloseSnack} severity={this.state.snackColor} sx={{ width: '100%' }}>
                        {this.state.snackMessage}
                    </Alert>
                </Snackbar>
            </>
        );
    }
}

export default GamePage;