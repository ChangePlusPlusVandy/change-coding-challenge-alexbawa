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
      score: [0,0]
    };
    this.getTweets = this.getTweets.bind(this);
    this.cycleTweets = this.cycleTweets.bind(this);
    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.handleSecondChange = this.handleSecondChange.bind(this);
  }

  getTweets(firstHandle,secondHandle){
    Twitter.getTweets(firstHandle, secondHandle).then(tweets => {
      const selectionIndex = Math.floor(Math.random()*tweets.length);
      const selection = tweets[selectionIndex];
      let nextArray = tweets;
      nextArray.splice(selectionIndex,1)
      this.setState({
        tweets: nextArray,
        selectedTweet: selection
      });
    })
  }

  cycleTweets() {
    const selectionIndex = Math.floor(Math.random()*this.state.tweets.length);
    const selection = this.state.tweets[selectionIndex];
    let nextArray = this.state.tweets;
    nextArray.splice(selectionIndex,1);
    this.setState({
      tweets: nextArray,
      selectedTweet: selection
    });
  }

  handleFirstChange(newHandle){
    this.setState({firstHandle: newHandle});
  }

  handleSecondChange(newHandle){
    this.setState({secondHandle: newHandle});
  }
  
  render() {
    return(
      <div className="app">
        <h1>@{this.state.firstHandle} or @{this.state.secondHandle}?</h1>
        <SearchBar getTweets={this.getTweets} handleFirstChange={this.handleFirstChange} handleSecondChange={this.handleSecondChange} firstHandle={this.state.firstHandle} secondHandle={this.state.secondHandle}/>
        <TweetContainer tweet={this.state.selectedTweet} firstHandle={this.state.firstHandle} secondHandle={this.state.secondHandle} cycleTweets={this.cycleTweets}/>
      </div>
    )
  };
}

export default App;

