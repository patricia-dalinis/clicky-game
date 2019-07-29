import React, { Component } from "react";
import Header from "./components/Header";
import PictureCard from "./components/PictureCard";
import Wrapper from "./components/Wrapper/Wrapper";
import pictures from "./pictures.json";
import "./App.css";

let correctGuesses = 0;
let highScore = 0;
let clickMessage = "Click on a hero to gain points! But, BEWARE, click on the same hero twice and you lose!";

class App extends Component {

  state = {
    pictures,
    correctGuesses,
    highScore,
    clickMessage
  };

  setClicked = id => {
    const pictures = this.state.pictures;
    
    const clickedPicture = pictures.filter(picture => picture.id === id);

    // If statement for already clicked picture, game over
    if (clickedPicture[0].clicked) {

      console.log("Correct Guesses: " + correctGuesses);
      console.log("High Score: " + highScore);

      correctGuesses = 0;
      clickMessage = "Sorry! This hero's turn has already passed!";

      for (let i = 0 ; i < pictures.length ; i++) {
        pictures[i].clicked = false;
      }

      this.setState({clickMessage});
      this.setState({correctGuesses});
      this.setState({pictures});

    } else if (correctGuesses < 11) {

      clickedPicture[0].clicked = true;
      correctGuesses++;
      clickMessage = "So far, so good! Keep rolling!";

      if (correctGuesses > highScore) {
        highScore = correctGuesses;
        this.setState({highScore});
      }

      // Shuffle array
      pictures.sort(function(a,b){return 0.5 - Math.random()});

      this.setState({pictures});
      this.setState({correctGuesses});
      this.setState({clickMessage});

    } else {

      clickedPicture[0].clicked = true;
      correctGuesses = 0;
      clickMessage = "Huzzah! You've completed the round. Roll Initiative again!";
      highScore = 12;
      this.setState({highScore});

      for (let i = 0 ; i < pictures.length ; i++) {
        pictures[i].clicked = false;
      }
      
      pictures.sort(function(a,b){return 0.5 - Math.random()});

      this.setState({pictures});
      this.setState({correctGuesses});
      this.setState({clickMessage});

    }
  };

  render() {
    return (
      <Wrapper>

        <Header>Vox Machina Memory Game</Header>

        <h3 className="score-summary">
          {this.state.clickMessage}
        </h3>

        <h3 className="score-summary card-header">
          Correct Guesses: {this.state.correctGuesses}
          <br />
          High Score: {this.state.highScore}
        </h3>

        <div className="container">
          <div className="row">
            {this.state.pictures.map(picture => (
            <PictureCard
            setClicked={this.setClicked}
            id={picture.id}
            key={picture.id}
            name={picture.name}
            image={picture.image}
            />
          ))}
          </div>
        </div>
    
      </Wrapper>
    );
  }
}

export default App;