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
      secondHandle: 'elonmusk'
    };
    this.getTweets = this.getTweets.bind(this);
    this.cycleTweets = this.cycleTweets.bind(this);
    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.handleSecondChange = this.handleSecondChange.bind(this);
  }

  getTweets(firstHandle,secondHandle){
    Twitter.getTweets(firstHandle, secondHandle).then(tweets => {
      const tweetCount = tweets.length;
      const selectionIndex = Math.floor(Math.random()*tweetCount);
      this.setState({
        tweets: tweets,
        selectedTweet: tweets[selectionIndex]
      });
    })
  }

  cycleTweets() {
    const tweetCount = this.state.tweets.length;
    const selectionIndex = Math.floor(Math.random()*tweetCount);
    this.setState({
      selectedTweet: this.state.tweets[selectionIndex]
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
        <h1>@{this.state.firstHandle} or @{this.state.secondHandle}</h1>
        <SearchBar getTweets={this.getTweets} handleFirstChange={this.handleFirstChange} handleSecondChange={this.handleSecondChange} firstHandle={this.state.firstHandle} secondHandle={this.state.secondHandle}/>
        <TweetContainer tweet={this.state.selectedTweet} firstHandle={this.state.firstHandle} secondHandle={this.state.secondHandle} cycleTweets={this.cycleTweets}/>
      </div>
    )
  };
}

export default App;

