/* eslint-disable no-undef */
$(document).ready(function() {

  $('textarea').on('input', function() {
    const maxChars  = 140;
    const charCount = $(this).val().length;
    const $target = $(this).nextAll(".counter");

    if (maxChars - charCount === 0) {
      $target.css("color", "#c03333").text("Limit reached!");

    } else {
      $target.css("color", "#494b54");
      $target.text(maxChars - charCount);

    }
  });
});