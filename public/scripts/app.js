/*
 * Client-side JS 
 */

moment().format()

$(function () {
  /*
  * use moment to handle setting how long ago.
  */

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
  var htmlTemplate = `<article id={{tweetID}}>
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
            <i class="fa fa-heart">{{numLikes}}</i></span>
      </footer>
    </article>`

  var template = Handlebars.compile(htmlTemplate)

  /**
  * createTweetElement creates a new DOM element for a tweet
  * @param {object} tweetData is a tweet object passed in from the database
  * @returns {object} tweet - returns a DOM element 
  */
  var createTweetElement = function (tweetData) {
    var dateString = getDateString(tweetData.createdAt)

    // use handlebars template to create the data. This handles XSS
    var data = template({
      tweetID: tweetData._id,
      name: tweetData.user.name,
      avatar: tweetData.user.avatars.regular,
      handle: tweetData.user.handle,
      content: tweetData.content.text,
      dateString: dateString,
      numLikes: tweetData.likes.length
    })

    // The magic of jquery happens here. Passing in the html description with all the proper classes.
    var tweet = $(data)
    return tweet
  }

  /**
  * flashError (string) Flash an error on $('.new-tweet .message') and fade it out over 5 seconds. 
  * @param {string} string - The error message to display. Should be less than 40 characters.
  */
  function flashError (string) {
    var errorObj = $('.new-tweet .message')
    errorObj.text(string)
    errorObj.css('opacity', '1')
    errorObj.css('display', 'inline')
    errorObj.fadeOut(5000)
  }

  // AJAXing Users------------------------------------------------------------------------------------------------------------------

  // AJAXing Tweets------------------------------------------------------------------------------------------------------------------
  var allTweets = $('#tweets-container')

  function setLoginScreen (user) {
    // If the user is logged in, user and avatar will be valid.
    if (user) {
      // user is logged in, show logout button, hide email, password, avatar and login button.
      // Start with the login and compose forms hidden
      $('#email').hide()
      $('#password').hide()
      $('#loginButton').val('Logout')
      $('#handle').hide()
      $('#avatar-file').hide()
      $('#login-form-title').text('Logout')
    } else {
      // user is not logged in, show login button,  email, password,
      // if new user is checked show avatar and file
      // Start with the login and compose forms hidden
      $('#email').show()
      $('#password').show()
      $('#loginButton').val('Login')
      $('#login-form-title').text('Login/Register')
      if (!$('#new-user').checked) {
        $('#handle').hide()
        $('#avatar-file').hide()
      }
    }
  }
  /*
  * User presses submit on the Compose tweet form, id is #tweet-form. 
  */
  $('#login-form').on('submit', function (event) {
    event.preventDefault()

    // Check to see if we are loggin out
    if ($('#loginButton').val() === 'Logout') {
      $.ajax({
        method: 'get',
        url: '/users/logout',
        data: {}
      }).done(function () {})
      var email = $('#email').val()
      var password = $('#password').val()

      // TODO check the string for empty or too long
      if (email <= 0 || password <= 0) {
        flashError('Please enter a valid email and password')
        return
      }
    }

    //  Post to the form
    const data = $(this).serialize()
    var thisLoginForm = this

    $.ajax({
      method: 'get',
      url: '/users/login',
      data: data
    }).done(function (user) {
      // TODO reset the form for more input
      thisLoginForm.reset()

      if (user) {
        // Set the avatar
        $('#user-avatar').attr('src', user.avatars.small)

        $('.login').slideUp('slow')

        setLoginScreen(user)

        // reload the tweets
        loadTweets()
      } else {
        // handle user not found.
        flashError('Invalid Email or Password')

        // handle no user
      }
    })
  })
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
      /**
      * User clicks on a tweet to like it. The click comes through because we call the on click
      * 
      * @param {string} 
      * @param {string} author - The author of the book.
      */
      $('.fa-heart').on('click', function (event) {
        event.preventDefault()

        // Pass the tweetID and the handle of the tweet. 
        // The server will check to make sure that the user is not tweeting their own tweets. 
        const tweetID = $(this)
          .closest('article')
          .attr('id')
        const tweetHandle = $(this)
          .closest('article')
          .find('.handle')
          .text()

        $.ajax({
          method: 'post',
          url: '/likes?' + $.param({ tweetID: tweetID, tweetHandle: tweetHandle }),
          data: { }
        }).done(function () {
          // TODO reset the form for more input
          loadTweets()
        })
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
      flashError('Please enter some text.')
      return
    }

    if (tweetLength > MAX_TWEET_LENGTH) {
      flashError(`Tweet too long, max ${MAX_TWEET_LENGTH}.`)
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

  // Start with the login and compose forms hidden
  $('.login').hide()
  $('.new-tweet').hide()
  setLoginScreen('')

  // Load the tweets the first time.
  // loadTweets will check if there is a user logged in
  loadTweets()
})
