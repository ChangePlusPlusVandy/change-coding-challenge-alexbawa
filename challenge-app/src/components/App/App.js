import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import TweetContainer from '../TweetContainer/TweetContainer';
import Twitter from '../../util/Twitter';

class App extends React.Component {
  constructor(props){
    super(props);
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
    this.getTweets = this.getTweets.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.cycleTweets = this.cycleTweets.bind(this);
    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.handleSecondChange = this.handleSecondChange.bind(this);
    this.win = this.win.bind(this);
    this.lose = this.lose.bind(this);
  }

  getTweets(firstHandle, secondHandle) {
    Twitter.getTweets(firstHandle, secondHandle).then(tweets => {
      const selectionIndex = Math.floor(Math.random()*tweets.length);
      const selection = tweets[selectionIndex];
      let nextArray = tweets;
      nextArray.splice(selectionIndex,1);
      document.getElementById('result-wrong').style.display = 'none';
      document.getElementById('result-correct').style.display = 'none';
      document.getElementById('empty-message').style.display = 'none';
      this.setState({
        tweets: nextArray,
        selectedTweet: selection,
        score:[0,0]
      });
    })
  }

  getUsers(firstHandle, secondHandle) {
    Twitter.getProfile(firstHandle, secondHandle).then(profileArray => {
      this.setState({
        users: profileArray
      });
    })
  }

  cycleTweets() {
    if(this.state.tweets.length > 0){
      const selectionIndex = Math.floor(Math.random()*this.state.tweets.length);
      const selection = this.state.tweets[selectionIndex];
      let nextArray = this.state.tweets;
      nextArray.splice(selectionIndex,1);
      this.setState({
        tweets: nextArray,
        selectedTweet: selection
      });
    } else {
      this.setState({
        playingStatus: false
      });
      document.getElementById('empty-message').style.display = 'block';
      document.getElementById('result-wrong').style.display = 'none';
      document.getElementById('result-correct').style.display = 'none';
    } 
  }

  win() {
    let scoreArray = this.state.score;
    scoreArray[0] = scoreArray[0] + 1;
    scoreArray[1] = scoreArray[1] + 1;
    this.setState({
      score: scoreArray
    });
    document.getElementById('result-wrong').style.display = 'none';
    document.getElementById('result-correct').style.display = 'block';
  }

  lose() {
    let scoreArray = this.state.score;
    scoreArray[1] = scoreArray[1] + 1;
    this.setState({
      score: scoreArray
    });
    document.getElementById('result-correct').style.display = 'none';
    document.getElementById('result-wrong').style.display = 'block';
  }

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
          <p>You have played all of the available tweets!</p>
          <p>Enter new handles to get a new pool.</p>
        </div>
      </div>
    )
  };
}

export default App;

