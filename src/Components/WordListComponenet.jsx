import React, { Component } from 'react';
import { Box, Chip } from "@mui/material";

import '../App.css'
class WordListComponent extends Component {
    props = this.props

    getList = () => {
        const list = Object.keys(this.props.wordList).map((word, index) => {
            return (
                <Box display="inline" key={index} className='centerText'>
                    <Chip variant="filled" color={this.props.wordList[word]} label={word} size="large" sx={{ m: 1, p: 1 }} className='largeFont' />
                </Box>
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