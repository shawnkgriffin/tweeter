/*
 * Client-side JS logic goes here
 */

$(function () {
  /*
  * use moment to handle setting how long ago.
  */
  moment().format()

  function getDateString (createdAt) {
    var dateString = ''

    var givenDate = new Date(createdAt)

    dateString = moment(givenDate).fromNow()

    return dateString
  }
  /*
  * Templating using Handlebars
  * This is placed outside the function as it only needs to be done once
  * still scoped inside this module.
  */
  var htmlTemplate = `<article>
      <header>
        <img src={{avatar}}>
        <p class='name'>{{name}}</p>
        <p class='handle'>{{handle}}</p>
      </header>
      <table>
        <td>{{content}}</td>
      </table>
      <footer>
      {{dateString}}
          <span><i class="fa fa-flag"></i>
            <i class="fa fa-retweet"></i>
            <i class="fa fa-heart"></i></span>
      </footer>
    </article>`

  var template = Handlebars.compile(htmlTemplate)

  /*
  * createTweetElement creates a new DOM element for a tweet
  * tweetData is a tweet object passed in from the database
  * returns a DOM element 
  */
  var createTweetElement = function (tweetData) {
    var dateString = getDateString(tweetData.createdAt)

    // use handlebars template to create the data. This handles XSS
    var data = template({
      name: tweetData.user.name,
      avatar: tweetData.user.avatars.regular,
      handle: tweetData.user.handle,
      content: tweetData.content.text,
      dateString: dateString
    })

    // The magic of jquery happens here. Passing in the html description with all the proper classes.
    var tweet = $(data)
    return tweet
  }

  // Helper function to Flash an error message on the object
  function flashError (object, string) {
    console.log(object, string)
    var errorObj = $('.new-tweet .message')
    errorObj.text(string)
    errorObj.css('opacity', '1')
    errorObj.css('display', 'inline')
    errorObj.fadeOut(5000)
  }

  // AJAXing ------------------------------------------------------------------------------------------------------------------------------------
  var allTweets = $('#tweets-container')

  function loadTweets () {
    $.ajax({
      method: 'get',
      url: '/tweets'
    }).done(function (tweets) {
      // remove the existing tweets
      allTweets.empty()

      tweets.forEach(function (tweet) {
        var tweetHTML = createTweetElement(tweet)
        allTweets.prepend(tweetHTML)
      })
    })
  }

  /*
  * User presses submit on the Compose tweet form, id is #tweet-form. 
  */
  $('#tweet-form').on('submit', function (event) {
    event.preventDefault()

    var tweetString = $('#tweet-text').val()
    var tweetLength = tweetString.length

    // TODO check the string for empty or too long
    if (tweetLength <= 0) {
      flashError(this, 'Please enter some text.')
      return
    }

    if (tweetLength > MAX_TWEET_LENGTH) {
      flashError(this, `Tweet too long, max ${MAX_TWEET_LENGTH}.`)
      return
    }

    //  Post to the form
    var theForm = this // Need to keep the form around for the callback.
    var data = $(this).serialize()

    $.ajax({
      method: 'post',
      url: '/tweets',
      data: data
    }).done(function () {
      // reset the form for more input
      theForm.reset()

      // reset the counter
      $('.new-tweet .counter').text(MAX_TWEET_LENGTH)
      // reload the tweets
      loadTweets()
    })
  })

  // Load the tweets the first time.
  loadTweets()
})
