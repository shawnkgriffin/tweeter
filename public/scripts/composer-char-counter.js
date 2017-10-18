const MAX_TWEET_LENGTH = 140;
/*
* function composerCharCounter() 
* - checks value of tweetString, 
* sets '.Counter'.innnerHTML 
* if -'ve turns .Counter red
*/

$(function() {
  $("#tweet-text").on("input", function() {
    var tweetString = $(this).val();

    const tweetLength = MAX_TWEET_LENGTH - tweetString.length;

    // go to the parent, find the .counter, set it to space remaing and red if less than MAX_TWEET_LENGTH.
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

  //Slide toggle Of course there is a jquery function for that.
  
  $("#compose").on("click", function() {
    
    // TODO get this working.
    $(".new-tweet").slideToggle("slow", function() {});
    var composeDisplay = $(".new-tweet").css('display');
    if (composeDisplay ==='block' ) {
      opacity = '1';
    } 
    if (composeDisplay ==='none' ) {
      opacity = '.7';
    } 
    
    $("#compose").css('opacity', opacity);

  });
});
