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
    return word.split('').sort(() => Math.floor(Math.random() * Math.floor(3)) - 1)
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
                    if (result.title == 'No Definitions Found') {
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
        if (this.state.currentWord.length > 2) {
            // first check if it exist in the given word and the call api
            this.checkWordExistence(this.state.currentWord)
        }
        const word = [...this.state.wordList, this.state.currentWord]
        this.setState({
            wordList: word,
            currentWord: ''
        })
        e.preventDefault()
    }

    componentDidMount() {
        if(this.state.timer > 0){
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
    }


    render() {
        return (
            <>
                <Box display="flex" mt={10}>
                    <Box m="auto" mb={5}>
                        <Typography variant="h2">
                            Your word is:&nbsp;
                            <Box fontWeight='fontWeightMedium' display='inline'>
                                {this.state.randomWord}
                            </Box>
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex">
                    <Box m="auto" mb={5}>
                        <Typography variant='h5'>
                            Timer: <Chip label={this.state.timer} size="large" />
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex">
                    <Box m="auto" mb={5}>
                        <form onSubmit={this.handleSubmit}>
                            <TextField id="matchingWords" label="Matching word" variant="outlined" size='large' onChange={this.handleEnter} value={this.state.currentWord} autoComplete="off" disabled={!this.state.timer>0}/>
                        </form>
                    </Box>
                </Box>

                <Box display="flex">
                    <Box m="auto" mb={5}>
                        <WordListComponent wordList={this.state.wordList} />
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