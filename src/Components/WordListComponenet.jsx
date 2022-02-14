import React, { Component } from 'react';
import { Box, Chip } from "@mui/material";

import '../App.css'
class WordListComponent extends Component {
    props = this.props

    getList = () => {
        const list = this.props.wordList.map((word, index) => {
            return (
                <Box m="auto" className='centerText' key={index} p={1} display="inline">
                    {/* Todo: Color can be maintained for error words and valid words  Instead of length  => 5 */}
                    <Chip variant="outlined" color={word.length>=5 ? 'success' : 'primary'} label={word} size="large" />
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