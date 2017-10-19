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
  * TODO refactor using mustache to handle XSS issues
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

  //Flash an error message on the object
  function flashError(object, string) {
    console.log(object, string);
    var errorObj = $(".new-tweet .message");
    errorObj.text(string);
    errorObj.css("opacity", "1");
    errorObj.css("display", "inline");
    errorObj.fadeOut(5000);

  }

  // AJAXing ------------------------------------------------------------------------------------------------------------------------------------
  var allTweets = $("#tweets-container");

  function loadTweets() {
    $.ajax({
      method: "get",
      url: "/tweets"
    }).done(function(tweets) {
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
    // TODO prevent default
    event.preventDefault();

    var tweetString = $('#tweet-text').val();
    var tweetLength = tweetString.length;

  
    // TODO check the string for empty or too long
    if (tweetLength <= 0) {
      flashError(this, "Need to enter some text.");
      return;
    }

    if (tweetLength > MAX_TWEET_LENGTH) {
      flashError(
        this,
        `Tweet too long, max ${MAX_TWEET_LENGTH}.`
      );
      return;
    }

    // TODO Post to the form
    var theForm = this;
    var data = $(this).serialize();

    $.ajax({
      method: "post",
      url: "/tweets",
      data: data
    }).done(function() {
      //reset the form for more input
      theForm.reset();

      //reset the counter
      $('.new-tweet .counter').text(MAX_TWEET_LENGTH);
      //reload the tweets
      loadTweets();
    });
  });

  // Load the tweets the first time.
  loadTweets();
});
