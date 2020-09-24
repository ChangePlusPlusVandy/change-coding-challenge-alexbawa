import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import TweetContainer from '../TweetContainer/TweetContainer';
import Twitter from '../../util/Twitter';

class App extends React.Component {
  constructor(){
    super();
    
    //Set tweets, users, score, and game status to start the game and pass to child components
    this.state = {
      tweets: [],
      selectedTweet: {},
      firstHandle: 'kanyewest',
      secondHandle: 'elonmusk',
      score: [0,0],
      playingStatus: true,
      users: [
        {
          username: 'kanyewest',
          name: 'ye',
          profilePic: 'https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_normal.jpg'
        },
        {
          username: 'elonmusk',
          name: 'Elon Musk',
          profilePic: 'https://pbs.twimg.com/profile_images/1295975423654977537/dHw9JcrK_normal.jpg'
        }]
    };
    
    //Bind all "this" in all functions to this class
    this.getTweets = this.getTweets.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.cycleTweets = this.cycleTweets.bind(this);
    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.handleSecondChange = this.handleSecondChange.bind(this);
    this.win = this.win.bind(this);
    this.lose = this.lose.bind(this);
  }

  //Call getTweets() function from Twitter.js, choose random tweet to display, set game to base state
  getTweets(firstHandle, secondHandle) {
    Twitter.getTweets(firstHandle, secondHandle).then(tweets => {
      
      //Choose next tweet
      const selectionIndex = Math.floor(Math.random()*tweets.length);
      const selection = tweets[selectionIndex];
      let nextArray = tweets;

      //Remove tweet from array
      nextArray.splice(selectionIndex,1);

      //Turn off win/lose/game over messages
      document.getElementById('result-wrong').style.display = 'none';
      document.getElementById('result-correct').style.display = 'none';
      document.getElementById('empty-message').style.display = 'none';

      //Set game to first round state
      this.setState({
        tweets: nextArray,
        selectedTweet: selection,
        score:[0,0],
        playingStatus: true
      });
    })
  }

  //Call getProfile() from Twitter.js, set profiles in state
  getUsers(firstHandle, secondHandle) {
    Twitter.getProfile(firstHandle, secondHandle).then(profileArray => {
      this.setState({
        users: profileArray
      });
    })
  }

  //If game is not over, get next tweet and update state - otherwise, end game and display game over message
  cycleTweets() {
    if(this.state.tweets.length > 0){
      //Choose next tweet
      const selectionIndex = Math.floor(Math.random()*this.state.tweets.length);
      const selection = this.state.tweets[selectionIndex];
      let nextArray = this.state.tweets;

      //Remove tweet from array
      nextArray.splice(selectionIndex,1);

      //Set next state
      this.setState({
        tweets: nextArray,
        selectedTweet: selection
      });

    } else {

      //Set state to game over
      this.setState({
        playingStatus: false
      });

      //Display game over message
      document.getElementById('empty-message').style.display = 'block';
      document.getElementById('result-wrong').style.display = 'none';
      document.getElementById('result-correct').style.display = 'none';
    } 
  }

  //When correct user chosen, increment wins and total rounds by 1, display "Correct!" message
  win() {
    let scoreArray = this.state.score;

    //Increment wins by 1
    scoreArray[0] = scoreArray[0] + 1;

    //Increment rounds by 1
    scoreArray[1] = scoreArray[1] + 1;
    
    //Update state with score
    this.setState({
      score: scoreArray
    });

    //Display "Correct!" message
    document.getElementById('result-wrong').style.display = 'none';
    document.getElementById('result-correct').style.display = 'block';
  }

  //When wrong user chosen, increment total rounds by 1, display "Incorrect!" message
  lose() {
    let scoreArray = this.state.score;

    //Increment rounds by 1
    scoreArray[1] = scoreArray[1] + 1;

    //Update state with score
    this.setState({
      score: scoreArray
    });

    //Display "Incorrect!" message
    document.getElementById('result-correct').style.display = 'none';
    document.getElementById('result-wrong').style.display = 'block';
  }

  //Update states for new user handles
  handleFirstChange(newHandle){
    this.setState({firstHandle: newHandle});
  }
  handleSecondChange(newHandle){
    this.setState({secondHandle: newHandle});
  }
  
  render() {
    return (
      <div className="app">
        <h1>@{this.state.firstHandle} or @{this.state.secondHandle}?</h1>
        
        <div className="main">
          <SearchBar getUsers={this.getUsers} getTweets={this.getTweets} handleFirstChange={this.handleFirstChange} handleSecondChange={this.handleSecondChange} firstHandle={this.state.firstHandle} secondHandle={this.state.secondHandle}/>
          <TweetContainer users={this.state.users} status={this.state.playingStatus} win={this.win} lose={this.lose} tweet={this.state.selectedTweet} firstHandle={this.state.firstHandle} secondHandle={this.state.secondHandle} cycleTweets={this.cycleTweets}/>
        </div>

        <div className="result">
          <div id="result-correct" className="result-correct">
            <p><span>Correct!</span> - Score: {Math.floor(this.state.score[0]/this.state.score[1]*100)}%</p>
          </div>
          <div id="result-wrong" className="result-wrong">
            <p><span>Incorrect!</span> - Score: {Math.floor(this.state.score[0]/this.state.score[1]*100)}%</p>
          </div>
        </div>

        <div id="empty-message">
          <p>You have played all of the available tweets! Your final score was <span>{Math.floor(this.state.score[0]/this.state.score[1]*100)}%</span>.</p>
          <p>Enter new handles to get a new pool.</p>
        </div>
      </div>
    )
  };
}

export default App;

