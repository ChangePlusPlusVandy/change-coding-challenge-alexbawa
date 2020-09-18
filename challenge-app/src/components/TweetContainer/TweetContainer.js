import React from 'react';
import './TweetContainer.css';

class TweetContainer extends React.Component {
    constructor(props) {
        super(props);

        this.guessFirst = this.guessFirst.bind(this);
        this.guessSecond = this.guessSecond.bind(this);
    }

    guessFirst(){
        if(this.props.tweet.name === this.props.firstHandle){
            this.props.win();
        } else {
            this.props.lose();
        }
        this.props.cycleTweets();
    }

    guessSecond(){
        if(this.props.tweet.name === this.props.secondHandle){
            this.props.win();
        } else {
            this.props.lose();
        }
        this.props.cycleTweets();
    }


    render() {
        return (
            <div className="TweetContainer">
                <div className="TweetContainer-text">
                    <p>{this.props.tweet.text}</p>
                </div>
                <div className="TweetContainer-buttons">
                    <div className="TweetContainer-button">
                        <button onClick={this.guessFirst}>@{this.props.firstHandle}</button>
                    </div>
                    <div className="TweetContainer-button">
                        <button onClick={this.guessSecond}>@{this.props.secondHandle}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TweetContainer;