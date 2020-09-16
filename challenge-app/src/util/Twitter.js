// key: "lfnM3tNwEHvh26E7x9WN4hxiQ"
// secret: "0HFLV5B5TcRLXFblvqvuV1q8Ah7flg6byzm5rkZXXuCk8LdZSy"
const bearerToken = "AAAAAAAAAAAAAAAAAAAAABMJHwEAAAAAN8kBUXK0ck1O063AvAgv%2FV47jd0%3DtL7IEXqWz6Vv9NeovNyLEqygDg7Ls4G1LCNY0SngDtf6oSXWWN";
const fetch = require('node-fetch');
const Twitter = {
    getTweets(firstHandle, secondHandle) {
        console.log('Starting Twitter search...');
        const headers = {
            Authorization: `Bearer ${bearerToken}`
        }
        return fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${firstHandle}&count=20`,headers).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse);
            if(jsonResponse[0]){
                const workableTweets = jsonResponse.filter(tweet => {
                    let works = true;
                    if(tweet.entities.user_mentions[0]){
                        works = false;
                    } else if (tweet.entities.urls[0]){
                        works = false;
                    }
                    return works;
                })
                return workableTweets;
            }
        })
    }
}

Twitter.getTweets('elonmusk','thisguy').then(tweets => {
    console.log(tweets);
})