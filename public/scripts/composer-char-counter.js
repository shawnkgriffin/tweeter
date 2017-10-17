const cMaxTweetLength = 140;
/*
* function composerCharCounter() 
* - checks value of tweetString, 
* sets '.Counter'.innnerHTML 
* if -'ve turns .Counter red
*/

$(document).ready(function() {
  $("#tweetText").on("keyup", function() {
    const tweetLength = cMaxTweetLength - $(this).val().length;
    // go to the parent, find the .counter, set it to space remaing and red if less than cMaxTweetLength.
    const counter = $(this).parent().find(".counter");
    if (tweetLength < 0) {
      counter.addClass("error");
    } else {
     counter.removeClass("error");
    }
    counter.html(tweetLength);
  });
});
