// key: "lfnM3tNwEHvh26E7x9WN4hxiQ" Don't steal this please!
// secret: "0HFLV5B5TcRLXFblvqvuV1q8Ah7flg6byzm5rkZXXuCk8LdZSy" 
const bearerToken = "AAAAAAAAAAAAAAAAAAAAABMJHwEAAAAAN8kBUXK0ck1O063AvAgv%2FV47jd0%3DtL7IEXqWz6Vv9NeovNyLEqygDg7Ls4G1LCNY0SngDtf6oSXWWN";
const fetch = require('cross-fetch');

const Twitter = {
    getTweets(firstHandle, secondHandle) {
        console.log('Starting Twitter search...');
        
        //Headers for GET request
        const headers = {
            Authorization: `Bearer ${bearerToken}`
        }

        //Request for first handle -> convert to json -> array of 200 tweet objects
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${firstHandle}&count=200&include_rts=false`,{headers}).then(firstResponse => {
            return firstResponse.json();
        }).then(firstJsonResponse => {
            
            //Check if response was valid
            if(firstJsonResponse[0]){
                
                //Filter tweets for those without tags or urls
                const firstValidTweets = firstJsonResponse.filter(tweet => {
                    let works = true;
                    if(tweet.entities.user_mentions[0]){
                        works = false;
                    } else if (tweet.entities.urls[0]){
                        works = false;
                    }
                    return works;
                })
                

                //Map array to objects of just text, username, and an array of pictures
                const firstTweetObjects = firstValidTweets.map(tweet => {
                    let firstPictureArray;
                    if (tweet.entities.media){
                        
                        //Map array of picture objects to just urls
                        firstPictureArray = tweet.entities.media.map(picture => {
                            return picture.media_url;
                        })
                    }
                    return {
                        text: tweet.text.replace('&amp;','&').replace('&amp;','&'),
                        name: tweet.user.screen_name,
                        pictures: firstPictureArray
                    };
                })

                //Request for second handle -> convert to json -> array of 200 tweet objects
                return fetch(`https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${secondHandle}&count=200&include_rts=false`,{headers}).then(secondResponse => {
                    return secondResponse.json();
                }).then(secondJsonResponse => {
                    
                    //Check if response was valid
                    if(secondJsonResponse[0]){

                        //Filter tweets for those without tags or urls
                        const secondValidTweets = secondJsonResponse.filter(tweet => {
                            let works = true;
                            if(tweet.entities.user_mentions[0]){
                                works = false;
                            } else if (tweet.entities.urls[0]){
                                works = false;
                            }
                            return works;
                        })

                        //Map array to objects of just text, username, and an array of pictures
                        const secondTweetObjects = secondValidTweets.map(tweet => {
                            let secondPictureArray;
                            if (tweet.entities.media){

                                //Map array of picture objects to just urls
                                secondPictureArray = tweet.entities.media.map(picture => {
                                    return picture.media_url;
                                })
                            }
                            return {
                                text: tweet.text.replace('&amp;','&').replace('&amp;','&'),
                                name: tweet.user.screen_name,
                                pictures: secondPictureArray
                            };
                        })

                        //return combination of two tweet arrays
                        return firstTweetObjects.concat(secondTweetObjects);
                    } else {
                        return null;
                    }
                })
            } else {
                return null;
            }
        })
    },

    getProfile(firstHandle, secondHandle) {
        
        //Headers for GET request
        const headers = {
            Authorization: `Bearer ${bearerToken}`
        }

        //Request for first handle with profile pic query-> convert to json -> profile object
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/users/by/username/${firstHandle}?user.fields=profile_image_url`,{headers}).then(firstResponse => {
            return firstResponse.json();
        }).then(firstJsonResponse => {
            
            //Make object of just username, name and profile picture url
            const firstProfile = {
                username: firstHandle,
                name: firstJsonResponse.data.name,
                profilePic: firstJsonResponse.data.profile_image_url
            };

            //Request for second handle with profile pic query-> convert to json -> profile object
            return fetch(`https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/users/by/username/${secondHandle}?user.fields=profile_image_url`,{headers}).then(secondResponse => {
                return secondResponse.json();
            }).then(secondJsonResponse => {
 
                //Make object of just username, name and profile picture url
                const secondProfile = {
                    username: secondHandle,
                    name: secondJsonResponse.data.name,
                    profilePic: secondJsonResponse.data.profile_image_url
                }

                //Return array of two profile objects
                return [firstProfile,secondProfile];
            }).catch(error => {
                console.log(error);
                return null;
            })
        }).catch(error => {
            console.log(error);
            return null;
        })
    }
}

export default Twitter;
