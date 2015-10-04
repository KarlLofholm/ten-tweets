var TenTweets = function() {
    // Module variables
    var wrapper;
    var searchInput;
    var searchButton;
    var tweetContainer;
    var tweetList;
    var init = function() {
        wrapper = document.querySelector('.twitter');
        // Stop initiation of the module if we cant't find the module identifier class (.twitter)
        if (wrapper === null) return;
        // Set module variables
        searchInput = wrapper.querySelector('.twitter__search-input');
        searchButton = wrapper.querySelector('.twitter__search-button');
        tweetContainer = wrapper.querySelector('.twitter__tweet-container');
        // Add event handlers 
        searchButton.addEventListener('click', function(event) {
            var searchInputValue = searchInput.value;
            // Stop function if text input is empty or button is disabled 
            if (searchInputValue == "" || this.disabled) return;
            // Add .start-search css animation class
            wrapper.classList.add('start-search');
            // Test if this is the first search. If not - do "fold-in" animation
            if (typeof tweetList !== 'undefined') {
                // Remove .fold-out css animation class
                tweetList.classList.remove('fold-out');
            };
            // Set page state to "loading"
            lockSearch('lock');
            // Start ajax call to get tweets
            getTweets(searchInputValue);
        }, false);
        // Trigger searchButton click on enter
        searchInput.addEventListener('keydown', function(event) {
            if (event.keyCode == 13) {
                searchButton.click();
            }
        }, false);
    };


    var getTweets = function(query) {
        // Start ajax call
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://node-ten-tweets.herokuapp.com/' + query);
        // Listen to response
        xhr.onreadystatechange = function(data) {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    // Success
                    renderTweets(JSON.parse(xhr.responseText));
                } else if (xmlhttp.status == 400) {
                    // 400 error
                    alert('There was an error 400')
                } else {
                    // General error
                    alert('There is an error. Please check your internet connection or Twitter API credentials')
                }
            }
        }
        xhr.send();
    };
    var renderTweets = function(twitterJSON) {
        // Reset current tweet list
        tweetContainer.innerHTML = null;
        if (typeof twitterJSON.errors === 'undefined' || twitterJSON.errors.length < 1) {
            // Create twitter__tweet-list
            tweetList = document.createElement("ul");
            tweetList.classList.add('twitter__tweet-list');

            var tweetObj = twitterJSON.statuses;

            if (tweetObj.length == 0) {
                // Display "Nothing was found" msg if tweetObj is empty
                var obj = tweetObj[i];
                var tweet = document.createElement("li");
                tweet.classList.add('twitter__tweet-item');
                tweet.appendChild(document.createTextNode("Nothing was found :("));
                tweetList.appendChild(tweet);
            } else {
                for (var i = 0; tweetObj.length > i; i++) {
                    var obj = tweetObj[i];

                    // Create twitter__tweet-item and add text
                    var tweet = document.createElement("li");
                    tweet.classList.add('twitter__tweet-item');
                    tweet.appendChild(document.createTextNode(obj.text));

                    // Create tweet twitter__tweet-profile-image and add user image
                    var tweetImg = document.createElement("img");
                    var tweetImgWrapper = document.createElement("div");
                    tweetImgWrapper.classList.add('twitter__tweet-profile-image');
                    tweetImg.setAttribute('src', obj.user.profile_image_url)
                    tweetImgWrapper.appendChild(tweetImg);
                    tweet.appendChild(tweetImgWrapper);

                    // Create twitter__tweet-profile-name element and add user name
                    var tweetName = document.createElement("div");
                    tweetName.classList.add('twitter__tweet-profile-name');
                    tweetName.appendChild(document.createTextNode("- " + obj.user.name));
                    tweet.appendChild(tweetName);

                    // Add tweet to list
                    tweetList.appendChild(tweet);
                }
            }

        } else {
            // Display error msg if twitter returns error
            var errorMsg = document.createElement("p");
            errorMsg.appendChild(document.createTextNode('Response error'));
            tweetList.appendChild(errorMsg);
        }
        // Add tweet list to the DOM
        tweetContainer.appendChild(tweetList);

        // Force the current style to be calculated to be able to use CSS transitions reliably
        void window.getComputedStyle(tweetList, null).getPropertyValue("opacity");
        tweetList.classList.add('fold-out');

        // Stop page loading
        lockSearch('unlock');

        //Set focus on tweetcontainer for keyboard users but reset scroll to prevent page jump.
        var x = window.scrollX,
            y = window.scrollY;
        tweetContainer.focus();
        window.scrollTo(x, y);
    }

    // Helper function for loading state
    var lockSearch = function(state) { // String: "lock" / "unlock"
        var locked = false;
        if (state == "lock") {
            wrapper.classList.add('loading');
            searchInput.disabled = true;
            searchButton.disabled = true;
            locked = true;
        } else if (state == "unlock") {
            wrapper.classList.remove('loading');
            searchInput.disabled = false;
            searchButton.disabled = false;
            locked = false;
        }
        return locked;
    }
    return {
        init: init
    };
}();

document.addEventListener('DOMContentLoaded', function() {
    TenTweets.init(); //initiate TenTweets Module
});
