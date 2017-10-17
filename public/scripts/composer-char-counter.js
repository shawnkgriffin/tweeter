/*
* function composerCharCounter() 
* - checks value of tweetString, 
* sets '.Counter'.innnerHTML 
* if -'ve turns .Counter red
*/

$(document).ready(function() {
  $("#tweetText").on("keyup", function() {
    const tweetString = $(this).val();
    const tweetLength = 140 - tweetString.length;

    $("#tweetCounter")[0].innerHTML = tweetLength;

    $("#tweetCounter")[0].style.color = tweetLength < 0 ? "red" : "black";
  });
});
