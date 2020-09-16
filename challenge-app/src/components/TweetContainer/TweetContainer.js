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
            console.log('Correct!');
        } else {
            console.log('Wrong!');
        }
        this.props.cycleTweets();
    }

    guessSecond(){
        if(this.props.tweet.name === this.props.secondHandle){
            console.log('Correct!');
        } else {
            console.log('Wrong!');
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
                    <div className="TweetContainer-firstHandle">
                        <button onClick={this.guessFirst}>{this.props.firstHandle}</button>
                    </div>
                    <div className="TweetContainer-secondHandle">
                        <button onClick={this.guessSecond}>{this.props.secondHandle}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TweetContainer;