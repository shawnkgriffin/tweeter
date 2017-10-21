const MAX_TWEET_LENGTH = 140
/*
* function composerCharCounter() 
* - checks value of tweetString, 
* sets '.Counter'.innnerHTML 
* if -'ve turns .Counter red
*/

$(function () {
  $('#tweet-text').on('input', function () {
    var tweetString = $(this).val()

    const tweetLength = MAX_TWEET_LENGTH - tweetString.length

    // go to the parent, find the .counter, set it to space remaing and red if less than MAX_TWEET_LENGTH.
    const counter = $(this)
      .parent()
      .find('.counter')

    if (tweetLength < 0) {
      counter.addClass('error')
    } else {
      counter.removeClass('error')
    }
    counter.html(tweetLength)
  })

  // Slide toggle Of course there is a jquery function for that.
  var composeToggleState = true

  $('#compose').on('click', function () {
    // use slideToggle to slide box in and out. 
    $('.new-tweet').slideToggle('slow', function () {})

    $('#compose').css('opacity', composeToggleState ? '1' : '.7')
    composeToggleState = !composeToggleState

    if (composeToggleState) {
      $('#tweet-text').focus()
    }
  })

  $('#user-avatar').on('click', function () {
    // use slideToggle to slide box in and out. 
    $('.login').slideToggle('slow', function () {})

    $('#login').css('opacity', composeToggleState ? '1' : '.7')
    composeToggleState = !composeToggleState

    if (composeToggleState) {
      $('#pwd').focus()
    }
  })
  
  $('#loginButton').on('click', function () {
    // use slideToggle to slide box in and out. 
    $('.login').slideToggle('slow', function () {})

    $('#login').css('opacity', composeToggleState ? '1' : '.7')
    composeToggleState = !composeToggleState

    if (composeToggleState) {
      $('#pwd').focus()
    }
  })
})
