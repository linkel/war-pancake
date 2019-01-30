import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {shuffleNewDeck, reshuffleDeck, drawCard, opponentDrawCard, opponentReshuffleDeck, addPoints, addOppPoints, reset, gameCompleted} from './actions';

class App extends Component {
  values = {
    "ACE" : 14,
    "KING" : 13,
    "QUEEN" : 12,
    "JACK" : 11,
    "10":10,
    "9":9,
    "8":8,
    "7":7,
    "6":6,
    "5":5,
    "4":4,
    "3":3,
    "2":2,
    "1":1,
  }
  componentDidUpdate() {
    if (this.props.points_flag) {
      let curr_value = this.props.current_card.length > 0 ? this.props.current_card[0].value : 0
      let opp_value = this.props.opp_cards.length > 0 ? this.props.opp_cards[0].value : 0
      if (curr_value !== 0 && opp_value !== 0) {
        if (this.values[curr_value] > this.values[opp_value]) {
          this.props.addPoints();
          if (document.querySelector("#opp_card")){
            document.querySelector("#opp_card").classList.add('wobble-hor-bottom');
            setTimeout(function() {
              document.querySelector("#opp_card").classList.remove('wobble-hor-bottom');
            }, 500);
          }
        } else {
          this.props.addOppPoints();
            if (document.querySelector("#your_card")){
            document.querySelector("#your_card").classList.add('wobble-hor-bottom');
            setTimeout(function() {
              document.querySelector("#your_card").classList.remove('wobble-hor-bottom');
            }, 500);
          }
        }
      }
      if (this.props.remaining_cards === 0) {
        if (this.props.points === 0 && this.props.points ===0) {
          this.props.gameCompleted("ongoing");
        }
        if (this.props.points > this.props.opp_points){
          // you won
          this.props.gameCompleted("won");
        } else if (this.props.points === this.props.opp_points) {
          // you tied
          this.props.gameCompleted("tied");
        } else {
          // you lost
          this.props.gameCompleted("lost");
        }
      }
    }
  }
  handleDraw = () => {
    const promise = new Promise((resolve, reject) => {
      this.props.drawCard();
    }).then(this.props.opponentDrawCard())
  }
  handleShuffle = () => {
    this.props.reshuffleDeck();
    this.props.opponentReshuffleDeck();
    this.props.reset();
    this.props.gameCompleted("ongoing");
  }
  render() {
    return (
      <div className="App">
      <div className="title">
          <h1>WAR: A CARD GAME</h1>
        </div>
        <div>
          {/* <h3>Current Deck id:{this.props.deck_id}</h3> */}
          <button onClick={this.handleShuffle}>Restart</button>
          <button onClick={this.handleDraw}>Draw Card and Fight!</button>
        </div>
        <div className="versus-box">
          <div className="card_wrapper">
            <h1>You</h1>
            Cards Remaining in Deck: {this.props.remaining_cards}
            {this.props.current_card.length > 0 ? <img id="your_card" className="imgdeck" alt={this.props.current_card[0].code} src={this.props.current_card[0].image}></img> : <div className="deck"></div>}
          <h1>Battles Won: {this.props.points}</h1>
          </div>
          <div className="card_wrapper">
            <h1>Opponent</h1>
          Opponent's Deck: {this.props.opp_remaining_cards}
            {this.props.opp_cards.length > 0 ? <img id="opp_card" className="imgdeck" alt={this.props.opp_cards[0].code} src={this.props.opp_cards[0].image}></img> : <div className="deck"></div>}
          <h1>Battles Won: {this.props.opp_points}</h1>
          </div>
        </div>
        { this.props.gameStatus === "ongoing" ? <h1>Who will win?</h1> : <div/>}
        { this.props.gameStatus === "won" ? <h1>You won!</h1> : <div/>}
        { this.props.gameStatus === "tied" ? <h1>You tied!</h1> : <div/>}
        { this.props.gameStatus === "lost" ? <h1>You lost!</h1> : <div/>}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    deck_id: state.cardsReducer.deck_id,
    remaining_cards: state.cardsReducer.remaining_cards,
    current_card: state.cardsReducer.cards,
    shuffled: state.cardsReducer.shuffled,
    points: state.cardsReducer.points,
    error: state.cardsReducer.error, 
    opp_remaining_cards: state.cardsReducer.opp_remaining_cards,
    opp_deck_id: state.cardsReducer.opp_deck_id,
    opp_shuffled: state.cardsReducer.opp_shuffled,
    opp_success: state.cardsReducer.opp_success,
    opp_cards: state.cardsReducer.opp_cards,
    opp_points: state.cardsReducer.opp_points,
    points_flag: state.cardsReducer.points_flag,
    gameStatus: state.cardsReducer.gameCompleted,
    fetchingInfo: state.cardsReducer.fetchingInfo // pending state, the fetching spinner or loading message etc. for when we're fetching!
  };
};

export default connect(mapStateToProps, { 
  shuffleNewDeck, reshuffleDeck, drawCard, opponentDrawCard, opponentReshuffleDeck, addPoints, addOppPoints, reset, gameCompleted})(App);
