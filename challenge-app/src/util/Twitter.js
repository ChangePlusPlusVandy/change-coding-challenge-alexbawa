// key: "lfnM3tNwEHvh26E7x9WN4hxiQ"
// secret: "0HFLV5B5TcRLXFblvqvuV1q8Ah7flg6byzm5rkZXXuCk8LdZSy"
const bearerToken = "AAAAAAAAAAAAAAAAAAAAABMJHwEAAAAAN8kBUXK0ck1O063AvAgv%2FV47jd0%3DtL7IEXqWz6Vv9NeovNyLEqygDg7Ls4G1LCNY0SngDtf6oSXWWN";
const fetch = require('cross-fetch');

const Twitter = {
    getTweets(firstHandle, secondHandle) {
        console.log('Starting Twitter search...');
        const headers = {
            Authorization: `Bearer ${bearerToken}`
        }
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${firstHandle}&count=200&include_rts=false`,{headers}).then(firstResponse => {
            return firstResponse.json();
        }).then(firstJsonResponse => {
            if(firstJsonResponse[0]){
                const firstValidTweets = firstJsonResponse.filter(tweet => {
                    let works = true;
                    if(tweet.entities.user_mentions[0]){
                        works = false;
                    } else if (tweet.entities.urls[0]){
                        works = false;
                    } else if (tweet.entities.media){
                        works = false;
                    }
                    return works;
                })
                const firstTweetObjects = firstValidTweets.map(tweet => {
                    return {
                        text: tweet.text.replace('&amp;','&'),
                        name: tweet.user.screen_name
                    };
                })
                return fetch(`https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${secondHandle}&count=200&include_rts=false`,{headers}).then(secondResponse => {
                    return secondResponse.json();
                }).then(secondJsonResponse => {
                    if(secondJsonResponse[0]){
                        const secondValidTweets = secondJsonResponse.filter(tweet => {
                            let works = true;
                            if(tweet.entities.user_mentions[0]){
                                works = false;
                            } else if (tweet.entities.urls[0]){
                                works = false;
                            } else if (tweet.entities.media){
                                works = false;
                            }
                            return works;
                        })
                        const secondTweetObjects = secondValidTweets.map(tweet => {
                            return {
                                text: tweet.text.replace('&amp;','&'),
                                name: tweet.user.screen_name
                            };
                        })
                        return firstTweetObjects.concat(secondTweetObjects);
                    }
                })
            }
        })
    }
}

export default Twitter;
