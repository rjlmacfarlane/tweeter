/* eslint-disable no-undef */

// Decrement character counter on input, alert user at limit:
$(document).ready(function() {

  $('textarea').on('input', function() {
    const maxChars  = 140;
    const charCount = $(this).val().length;
    const $target = $(this).nextAll(".counter");

    if (maxChars - charCount === 0) {
      $target.css("color", "#c03333").text(maxChars - charCount);
      $('.error-message').slideDown();
      $('.error-message strong').text("Character limit reached!");
    
    } else if (maxChars - charCount < 16) {
      $target.css("color", "#c26a18").text(maxChars - charCount);
    
    } else {
      $target.css("color", "#494b54");
      $target.text(maxChars - charCount);
      $(".error-message").slideUp();

    }
  });
});