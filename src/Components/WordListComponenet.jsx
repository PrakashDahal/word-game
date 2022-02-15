import React, { Component } from 'react';
import { Box, Chip } from "@mui/material";

import '../App.css'
class WordListComponent extends Component {
    props = this.props

    getList = () => {
        const list = this.props.wordList.map((word, index) => {
            return (
                    <Box display="inline" key={index}  className='centerText'>
                        {/* Todo: Color can be maintained for error words and valid words  Instead of length  => 5 */}
                        <Chip variant="outlined" color={word.length >= 5 ? 'success' : 'primary'} label={word} size="large" sx={{m:1}} />
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