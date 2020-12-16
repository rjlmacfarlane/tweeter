/* eslint-disable no-undef */

// Create, render, and prepend existing Tweets:
$(document).ready(function() {
  
  const renderTweets = function(tweets) {
    
    return tweets.forEach(tweet => {
      $('.tweets-container').prepend(createTweetElement(tweet));
    });

  };

  const createTweetElement = function(tweet) {

    const datePosted = new Date(tweet.created_at).toLocaleString;
    const article = `
    
        <article class="tweet">
          <div class="animate__animated animate__fadeInDown">
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
          </div>
        </article>`;

    return article;

  };

  // Submit a new tweet from form:
  const submitNewTweet = function($form) {
    const $textarea = $form.children('textarea');
    const content = $textarea.val().trim();

    if (!content || content === '') {
      console.log('Content invalid. AJAX request aborted.');
      alert('You forgot to type something, dummy!');
    
    } else {

      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $form.serialize()
      })
        .done(function() {
          $textarea.val('');
          console.log('AJAX request: Success!', $form);
          loadTweets("/tweets", "GET", renderTweets);
        })
        .fail(function() {
          console.log('AJAX request: Error!');
        })
        .always(function() {
          console.log('AJAX request: Done.');
        });
  
    }
  };
 
  $("form").on("submit", function(event) {
    
    event.preventDefault();
    console.log('Checking content validity...');
    submitNewTweet($(this));

  });

  // Load tweets from in-memory database:
  const loadTweets = function(url, method, callback) {
    $.ajax({
      url,
      method,
    })
      .done(function(data) {
        callback(data);
      })
      .fail(function(err) {
        console.log('Error:', err);
      })
      .always(function() {
        console.log("Load tweet function exited.");
      });
  };

  loadTweets("/tweets", "GET", renderTweets);

});

