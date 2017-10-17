const cMaxTweetLength = 140;
/*
* function composerCharCounter() 
* - checks value of tweetString, 
* sets '.Counter'.innnerHTML 
* if -'ve turns .Counter red
*/

$(document).ready(function() {
  $("#tweetText").on("keyup", function() {
    const tweetString = $(this).val();
    const tweetLength = cMaxTweetLength - tweetString.length;
    // go to the parent, find the .counter, set it to space remaing and red if less than cMaxTweetLength.
    const counter = $(this)
      .parent()
      .find(".counter")[0];
    counter.style.color = tweetLength < 0 ? "red" : "black";
    counter.innerHTML = tweetLength;
  });
});
