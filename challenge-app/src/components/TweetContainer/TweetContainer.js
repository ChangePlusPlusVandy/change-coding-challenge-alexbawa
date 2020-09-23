import React from 'react';
import './TweetContainer.css';

class TweetContainer extends React.Component {
    constructor(props) {
        super(props);

        this.guessFirst = this.guessFirst.bind(this);
        this.guessSecond = this.guessSecond.bind(this);
    }

    guessFirst(){
        if(this.props.tweet.name === this.props.firstHandle && this.props.status){
            this.props.win();
        } else if (this.props.status) {
            this.props.lose();
        }
        this.props.cycleTweets();
    }

    guessSecond(){
        if(this.props.tweet.name === this.props.secondHandle){
            this.props.win();
        } else if (this.props.status){
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
                    <div onClick={this.guessFirst} className="TweetContainer-button">
                        <img src={this.props.users[0].profilePic} alt="first profile pic"></img>
                        <p>{this.props.users[0].name} <span>@{this.props.users[0].username}</span></p>
                    </div>
                    <div onClick={this.guessSecond} className="TweetContainer-button">
                        <img src={this.props.users[1].profilePic} alt="second profile pic"></img>
                        <p>{this.props.users[1].name} <span>@{this.props.users[1].username}</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default TweetContainer;