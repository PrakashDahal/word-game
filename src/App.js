
import { Alert, Collapse } from "@mui/material";
import React, { Component } from "react";
import GamePage from "./Components/GamePage";
import StartPage from "./Components/StartPage";

class App extends Component {

  state = {
    isPlay: false,
    timer: 60
  }

  startGame = () => {
    this.setState({
      isPlay: true
    })
  }

  finishGame = () => {
    setTimeout(() => {
      this.setState({
        isPlay: false
      })
    }, 4000);
  }


  getPage() {
    if (this.state.isPlay) {
      return <GamePage finishGame={this.finishGame} />
    }
    return <StartPage playGame={this.startGame} />
  }

  render() {
    return (
      <>
        {
          localStorage.getItem('score') > 500 &&
          <Collapse in={true}>
            <Alert variant="filled" color='success'>
              <strong>
                Congrats! you nailed it &nbsp;&nbsp;
              </strong>
              <br />
              Reset to play from first winner.
            </Alert>
          </Collapse>
        }
        {this.getPage()}
      </>
    );
  }
}

export default App;
