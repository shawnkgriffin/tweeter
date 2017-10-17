/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('#TweetText').on('keyup', function() {
    const tweetString = $(this).val();
    
    $('.counter')[0].innerHTML = 140 - tweetString.length;
  });
});
