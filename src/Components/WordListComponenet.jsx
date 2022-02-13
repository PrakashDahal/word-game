import React, { Component } from 'react';
import { SnackbarContent, Stack } from "@mui/material";

import '../App.css'

class WordListComponent extends Component {
    props = this.props


    getList = () => {
        const list = this.props.wordList.map((word, index) => {
            return (
                <Stack spacing={2} key={index} >
                    <SnackbarContent message={word} sx={{ m: 1 }} />
                </Stack>
            )
        })
        return list;
    }
    render() {
        return (
            <>
                {this.getList()}
            </>
        );
    }
}

export default WordListComponent;