$('#accordion').on('shown.bs.collapse', function(event) {
  $('html, body').animate({
    scrollTop: $(event.target).parent().offset().top
  }, 400);
});
