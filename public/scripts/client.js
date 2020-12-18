/* eslint-disable no-undef */

// Prevent XSS attack (escape malicious text)
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Create, render, and prepend existing Tweets:
$(document).ready(function() {
  
  // Inject rendered tweets into HTML:
  const renderTweets = function(tweets) {
    return tweets.forEach(tweet => {
      $('.tweets-container').prepend(createTweetElement(tweet));
    });
  };

  // Generate HTML for prepend:
  const createTweetElement = function(tweet) {
    
    const tweetDate = new Date(tweet.created_at);
    
    // Render date into past tense (ago) format:
    const timeSince = () => {
      const now = new Date();
      const msInDay = 24 * 60 * 60 * 1000;
      const days = (now - tweetDate) / msInDay;
      const hours = days * 24;
      const minutes = hours * 60;
      
      if (Math.floor(hours) === 0) {
        return `${Math.floor(minutes)} minutes`;
      
      } else if (Math.floor(days / 365) === 0) {
        return `${Math.floor(hours)} hours`;
      
      } else if (days < 31) {
        return `${Math.floor(days / 365)} days`;
     
      } else if (days <= 365) {
        return `${Math.floor(days / 31)} months`;
     
      } else {
        return `${Math.floor(days / 365)} years`;
      }
    };

    const article = `
    
        <article class="tweet">
          <div class="animate__animated animate__fadeIn">
          <header>
            <span class="avatar"><img src="${tweet.user.avatars}">
            <span class="name"></span><strong>${tweet.user.name}</strong></span>
            <span class="alias">${tweet.user.alias}</span>
          </header>
              <span class="content">${escape(tweet.content.text)}</span>
          <footer>
            <span class="footer">Posted ${timeSince()} ago</span>
            <span class="actions">
              <i class="fab fa-font-awesome-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
             </span>
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
      $('.error-message').slideDown();
      $('.error-message strong').text("Did you forget to type something?");
      return;
    
    } else {

      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $form.serialize()
      })
        .done(function() {
          $textarea.val('');
          $form.children('.counter').text('140');
          console.log('AJAX request: Success!', $form);
          $('.tweets-container').empty();
          loadTweets("/tweets", "GET", renderTweets);
        })
        .fail(function() {
          console.log('AJAX request: Error!');
        })
        .always(function() {
          console.log('AJAX request: Done.');
        });
      return;
    }
  };
 
  // New tweet event handler:
  $("form").on("submit", function(event) {
    
    event.preventDefault();
    console.log('Checking content validity...');
    submitNewTweet($(this));

  });

  // Load tweets from in-memory database:
  const loadTweets = function(url, method, callback) {
    console.log('loadTweets hit');
    $(".error-message").hide();
    $(".new-tweet").hide();

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
        console.log('Load tweet function exited.');
      });
  };
    
  $("nav button").on('click', function() {
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  });

  // Initial page load:
  loadTweets('/tweets', 'GET', renderTweets);

});