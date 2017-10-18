/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 /*
 * initial TweetArray is used to create the seed tweets
 */
var initialTweetArray = 
[
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  },
  {
    user: {
      name: "Newton",
      avatars: {
        small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      handle: "@SirIsaac"
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  }
];
/*
* createTweetElement takes a tweet object and creates a DOM element for it
*/
var createTweetElement = function(tweetData) {
  var dateString = "5 days ago";

  var html = `<article>
        <header>
          <img src=${tweetData.user.avatars.regular}>
          <p class='name'>${tweetData.user.name}</p>
          <p class='handle'>${tweetData.user.handle}</p>
        </header>
        <table>
          <td>${tweetData.content.text}</td>
        </table>
        <footer>
        ${dateString}
            <span><i class="fa fa-flag"></i>
              <i class="fa fa-retweet"></i>
              <i class="fa fa-heart"></i></span>
        </footer>
      </article>`;

  console.log(html);
  // The magic of jquery happens here. Passing in the html description with all the proper classes. 
  var tweet = $(html);
  return tweet;
};

// Test / driver code (temporary). Eventually will get this from the server.

$(function() {
  debugger;
  for ( let tweetData of initialTweetArray ) {
    
    // create a DOM element 
    var $tweet = createTweetElement(tweetData);
    
    // Test / driver code (temporary)
    
    console.log($tweet); // to see what it looks like
    
    $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
  
});

