import React from 'react';
import './TweetContainer.css';

class TweetContainer extends React.Component {
    constructor(props) {
        super(props);

        this.guessFirst = this.guessFirst.bind(this);
        this.guessSecond = this.guessSecond.bind(this);
        this.renderPictures = this.renderPictures.bind(this);
        this.renderText = this.renderText.bind(this);
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

    renderPictures(){
        if(this.props.tweet.pictures) {
            return this.props.tweet.pictures.map(picture => {
                return <img alt="picture from twitter" src={picture}></img>
            })
        } else {
            return;
        }
    }

    renderText(){
        if(this.props.tweet.text){
            const linkCheck = this.props.tweet.text.indexOf('https://t.co/')
            if(linkCheck === 0){
                return <p style={{display:'none'}}></p>
            } else if(linkCheck === -1){
                return <p style={{display:'block'}}>{this.props.tweet.text}</p>
            } else {
                return <p style={{display:'block'}}>{this.props.tweet.text.substring(0,linkCheck)}</p>
            }
        } else {
            return <p style={{display:'none'}}></p>
        }
        
    }


    render() {
        return (
            <div className="TweetContainer">
                <div className="TweetContainer-text" id="TweetContainer-text">
                    {this.renderText()}
                    <div className="TweetContainer-images">
                        {this.renderPictures()}
                    </div>
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