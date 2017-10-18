const cMaxTweetLength = 140;
/*
* function composerCharCounter() 
* - checks value of tweetString, 
* sets '.Counter'.innnerHTML 
* if -'ve turns .Counter red
*/


$(function () {
  $("#tweet-text").on("keyup", function() {

    var tweetString = $(this).val();

    const tweetLength = cMaxTweetLength - tweetString.length;

    // go to the parent, find the .counter, set it to space remaing and red if less than cMaxTweetLength.
    const counter = $(this)
      .parent()
      .find(".counter");

    if (tweetLength < 0) {
      counter.addClass("error");
    } else {
      counter.removeClass("error");
    }
    counter.html(tweetLength);
  });
  
  
});
