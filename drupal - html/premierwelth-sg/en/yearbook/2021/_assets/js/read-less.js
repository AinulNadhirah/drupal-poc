$('.collapse').on('hidden.bs.collapse', function () {
      $('.read-more').text('Read more');
    });
    $('.collapse').on('shown.bs.collapse', function () {
      $('.read-more').text('Read less');
    });
