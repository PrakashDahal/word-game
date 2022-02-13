import React, { Component } from 'react';
import { Box, Chip, TextField, Typography } from "@mui/material";

import '../App.css'
import WordListComponent from './WordListComponenet';

const randomWords = require('random-words');


function getRandomWord() {
    // Todo: take more words of array and take larger text words
    // Eg; more than 4
    const word = randomWords({ exactly: 2, maxLength: 20 }).join('');


    // suffle nicely
    // https://stackoverflow.com/questions/2724509/shuffling-words-in-a-sentence-in-javascript-coding-horror-how-to-improve
    return word.split('').sort(() => Math.floor(Math.random() * Math.floor(3)) - 1).join('')
}

class GamePage extends Component {
    state = {
        randomWord: getRandomWord(),
        currentWord: '',
        wordList: [],
        mark: 0,
        timer: 60
    }


    handleEnter = (e) => {
        this.setState({
            currentWord: e.target.value
        })
    }

    checkWordExistence = (word) => {
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.title === 'No Definitions Found') {
                        console.log('Enter Valid word')
                    } else {
                        // separate marks calculation
                        // 
                        const mark = this.state.mark + 1
                        this.setState({
                            mark: mark
                        })
                    }
                },
                (error) => {
                    console.log(error);
                }
            )

    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.timer > 0 && !this.state.wordList.includes(this.state.currentWord) && this.state.currentWord.length > 2) {
            if (this.isValidSubString(this.state.randomWord, this.state.currentWord)) {
                this.checkWordExistence(this.state.currentWord)
            }
            const word = [this.state.currentWord, ...this.state.wordList]
            this.setState({
                wordList: word,
                currentWord: ''
            })
        }
    }

    componentDidMount() {
        if (this.state.timer > 0) {
            this.timerID = setInterval(
                () => this.decreaseTimer(),
                1000
            );
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    decreaseTimer() {
        const timer = this.state.timer > 0 ? (this.state.timer - 1) : 0
        this.setState({
            timer: timer
        })
        if (timer <= 0) {
            setTimeout(() => {
                this.props.finishGame()
            }, 5000);
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


    render() {
        return (
            <>
                <Box mt={10} className="centerContent">
                    <Box m="auto" className='centerText'>
                        <Typography variant="h2" sx={{ m: 4 }}>
                            Your word is:&nbsp;
                            <Box fontWeight='fontWeightMedium' display='inline'>
                                {this.state.randomWord}
                            </Box>
                        </Typography>

                        <Typography variant='h5' sx={{ m: 4 }}>
                            Timer: <Chip label={this.state.timer} size="large" />
                        </Typography>

                        <form onSubmit={this.handleSubmit} sx={{ m: 4 }}>
                            <TextField id="matchingWords" label="Matching word" variant="outlined" size='large' onChange={this.handleEnter} value={this.state.currentWord} autoComplete="off" disabled={!this.state.timer > 0} />
                        </form>

                        {/* <Box sx={{ m: 4 }}> */}
                        <WordListComponent wordList={this.state.wordList} />
                        {/* </Box> */}

                    </Box>
                </Box>


                <Typography variant='h2'>
                    {this.state.mark}
                </Typography>

            </>
        );
    }
}

export default GamePage;