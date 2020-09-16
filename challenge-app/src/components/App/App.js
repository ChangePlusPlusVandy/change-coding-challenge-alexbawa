import React from 'react';
import './App.css';
import TweetContainer from '../TweetContainer/TweetContainer';
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
        <TweetContainer/>
      </div>
    )
  };
}

export default App;
