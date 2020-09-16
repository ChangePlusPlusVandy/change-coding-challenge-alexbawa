import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
//import TweetContainer from '../TweetContainer/TweetContainer';
import Twitter from '../../util/Twitter';

class App extends React.Component() {
  constructor(props){
    super(props);
    this.state = {
      tweets = []
    };
    this.getTweets = this.getTweets.bind(this);
  }

  getTweets(firstHandle,secondHandle){
    Twitter.getTweets(firstHandle, secondHandle).then(tweets => {
      this.setState({tweets: tweets});
    })
  }
  
  render() {
    return(
      <div className="app">
        <h1>Kanye or Elon?</h1>
        <SearchBar getTweets={this.getTweets}/>
        
      </div>
    )
  };
}

export default App;

//<TweetContainer tweets={this.state.tweets}/>