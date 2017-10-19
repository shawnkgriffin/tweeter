# Functional Requirements
*	Primarily a client-side Single Page App (SPA)
*	The client-side app communicates with a server via AJAX
*	Tweets are persisted to MongoDB and survive server restart
Display Requirements
#	Navigation Bar:
- [X] is fixed to the top
- [X] has padding on both sides
- [X] contains Compose button
#	Compose Tweet box:
- [X] is displayed above the list of tweets
- [X] contains a form for submitting tweets, which itself contains:
- [X] a textarea for new tweet content
- [X] a left-aligned button for submitting new tweets
- [X] contains a Character Counter, right-aligned, which by default 
shows 140
#	List of Tweets:
- [X] displays tweets in reverse-chronological order (that is, by creation 
time descending)
#	Individual Tweets:
- [X] have a header, which contains the user's:
- [X] avatar, on the left
- [X] name, on the left and after the avatar
- [X] handle, on the right
- [X] have a body, which contains the tweet text
- [X] have a footer, which displays:
- [X] how long ago the tweet was created, on the left
- [X] "Flag", "Re-tweet" and "Like" icons upon hovering over the tweet, on the right
# Behaviour
## Navigation Bar
###	When a user clicks the Compose button in the Navigation Bar:
- [X] if the Compose Tweet box is currently hidden, then it is shown, and the text area inside it is auto-focused
- [X] if the Compose Tweet box is currently showing, then it is hidden
- [X] in either case, transitions between 'shown' and 'hidden' states 
should be animated
### Character Counter
- [X]	When a user types into the Compose Tweet textarea, the Character 
Counter is updated to show how many characters a user may still type (subtracting the number of characters they've typed from the maximum allowable character count of 140)
- [X] The Character Counter turns red (or similar) when more than 140 
characters have been typed into the Compose Tweet textarea, and it  shows how many characters over the 140 limit have been typed (using  a negative number)
### Compose Tweet
- [X] When a user submits an invalid tweet (the tweet textarea is empty or 
contains more than 140 characters), an appropriate error message is 
displayed
- [X] When a user submits a valid tweet, the list of tweets is refreshed 
(displaying the new tweet), the Compose Tweet textarea is cleared, 
and the Character Counter is reset (to 140)
## Stretch
- [ ] When a user clicks a tweet's "Like" button, the "Like" count is updated
- [ ] Only logged-in users may "like" tweets, and they may not "like" their own tweets

