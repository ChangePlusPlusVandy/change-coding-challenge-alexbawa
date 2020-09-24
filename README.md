

----- Introduction -----

This is the application for my application (mind = blown). I had a lot of fun making this, so I hope you enjoy using it.

To play, just download this folder, navigate to it in terminal by entering  "cd change-coding-challenge-alexbawa/challenge-app" from the directory containing it, and enter "npm start".

It will deploy the webpage at http://localhost:3000 and you can play away!


----- Changing Twitter Usernames -----

The default settings of the game are for @elonmusk and @kanyewest, but you can change those at anytime. 

Just enter any new handles you want to use at the top of the page, and you should see your changes real time in the header. There is no need to put the "@" sign before the username. Next, press "Update Tweets" and a new batch of tweets and guessing options will be loaded and displayed.


----- Score / Endgame -----

The app will track your score as you play and let you know how you're doing with a win percentage. The game won't end until you've played through all of the valid tweets that were loaded (400 were intially retrieved, but <200 typically remain after filtering). Once you've burned through the whole array, your final win percentage will be displayed. You can play again with the same usernames by just pressing "Update Tweets" or you can switch it up with some new ones as described above.


