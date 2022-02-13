
import React, { Component } from "react";
import GamePage from "./Components/GamePage";
import StartPage from "./Components/StartPage";

class App extends Component {

  state = {
    isPlay: false
  }

  startGame = () => {
    this.setState({
      isPlay: true
    })
  }

  finishGame = () => {
    this.setState({
      isPlay: false
    })
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
        {this.getPage()}
      </>
    );
  }
}

export default App;
