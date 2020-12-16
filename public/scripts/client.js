/* eslint-disable no-undef */
$(document).ready(function() {
  
  const data = [{
    "user": {
      "name": "Bill Gates",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "alias": "@windoze4lyfe"
    },
    "content": {
      "text": "Nobody will ever need more than 640 KB of ram."
    },
    "created_at": 362372400000
  },
  {
    "user": {
      "name": "Emo Philips",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "alias": "@emophil" },
    "content": {
      "text": "A computer once beat me at chess, but it was no match for me at kick boxing."
    },
    "created_at": 1119754800000
  }];


  const renderTweets = function(tweets) {
    
    return tweets.forEach(tweet => {
      console.log('Line 30 client.js', tweet.user.name);
      $('.tweets-container').prepend(createTweetElement(tweet));
    });

  };

  const createTweetElement = function(tweet) {

    const datePosted = new Date(tweet.created_at);
    const article = `<article class="tweet">
          <header>
            <span class="avatar"><img src="${tweet.user.avatars}">
            <span class="name"></span><strong>${tweet.user.name}</strong></span>
            <span class="alias">${tweet.user.alias}</span>
          </header>
              <span class="content">${tweet.content.text}</span>
          <footer>
            <span class="footer">Posted ${datePosted}</span>
            <div class="actions">
              <i class="fab fa-font-awesome-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
          </div>
          </footer>
          </article>`;

    return article;
  };
  renderTweets(data);

});

// console.log(renderTweets(data));