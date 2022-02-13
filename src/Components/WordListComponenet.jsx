import React, { Component } from 'react';
import { SnackbarContent, Stack } from "@mui/material";

class WordListComponent extends Component {
    props = this.props

    getList = () => {
        const list = this.props.wordList.map((word, index) => {
            return (
                <Stack sx={{ m: 2 }} key={index} >
                    <SnackbarContent message={word} />
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