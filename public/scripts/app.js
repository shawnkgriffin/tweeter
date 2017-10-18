/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(function() {

  /*
  * getDateString returns 
  * created_at =  today (hours ago )
  * created_at < 60 min (minutes ago)
  * created_at < today ( date)
  */
  function getDateString(created_at) {
    var dateString = "";
    var today = new Date();
    var givenDate = new Date(created_at);

    dateString =
      givenDate.getFullYear().toString() +
      "/" +
      (givenDate.getMonth() + 1).toString() +
      "/" +
      givenDate.getDate().toString();

    return dateString;
  }
  /*
  * createTweetElement takes a tweet object and creates a DOM element for it
  */
  var createTweetElement = function(tweetData) {
    var dateString = getDateString(tweetData.created_at);

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

  function oldTweetLoader() {
    for (let tweetData of initialTweetArray) {
      // create a DOM element
      var $tweet = createTweetElement(tweetData);

      // Test / driver code (temporary)

      console.log($tweet); // to see what it looks like

      $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  }

  // AJAXing ------------------------------------------------------------------------------------------------------------------------------------
  var allTweets = $("#tweets-container");

  function loadTweets() {
    debugger;

    $.ajax({
      method: "get",
      url: "/tweets"
    }).done(function(tweets) {
      debugger;
      //remove the existing tweets
      allTweets.empty();

      // todo then iterate over each Tweet
      tweets.forEach(function(tweet) {
        // todo then create html representing the Tweet
        var tweetHTML = createTweetElement(tweet);
        // todo then append that html to the #all-Tweets
        allTweets.prepend(tweetHTML);
      });
    });
  }
  /*
  * User presses submit on the new tweet form. Form name is #tweet-form
  */

  $("#tweet-form").on("submit", function(event) {
    debugger;
    // TODO prevent default
    event.preventDefault();

    // TODO Post to the form
    var theForm = this;
    var data = $(this).serialize();

    $.ajax({
      method: "post",
      url: "/tweets",
      data: data
    }).done(function() {
      debugger;
      //reset the form for more input
      theForm.reset();

      //reload the tweets
      loadTweets();
    });
  });

  // Load the tweets the first time.
  loadTweets();
});
