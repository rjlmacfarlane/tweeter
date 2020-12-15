/* eslint-disable no-undef */
$(document).ready(function() {

  $('textarea').on('input', function() {
    const maxChars  = 140;
    const charCount = $(this).val().length;
    $(this).nextAll(".counter").text(maxChars - charCount);

    if (maxChars - charCount === 0) {
      $(this).nextAll(".counter").css("color", "#c03333").text("Limit reached!");

    } else {
      $(this).nextAll(".counter").css("color", "#494b54");

    }
  });
});