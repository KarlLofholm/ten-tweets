# Ten tweets

Link to project http://tentweets.lofholm.se/app.html

This was a small project I did just to play around with the twitter API. 

The "App" search Twitter for the 10 latest tweets based on an hashtag that the user specifics. The tweets are then displayed in a list using a kickass CSS3 animation :)

To challenge myself I did’t use any JS frameworks, such as jQuery, and wrote everything in plain JS. The same goes for CSS, even though I used SASS files so I could use imports and autoprefixer. Since you know… nobody likes writing browser prefixes. 

The app uses a REST endpoint, built in nodeJS, to get the tweets. https://github.com/KarlLofholm/node-ten-tweets

Since this was more of a educational project and I wanted to use modern web technologies (HTML5, CSS3, ES5, Inline SVG) I don’t have full support for legacy browsers.