$(function(){

  var bookOptions = {
     height   : 816
    ,width    : 1152
    // pageWidth  : 1200
    // ,pageHeight : 816
    ,maxHeight : 900

    ,centeredWhenClosed : true
    ,hardcovers : false
    ,toolbar : "lastLeft, left, right, lastRight, toc, zoomin, zoomout, fullscreen"
    ,thumbnailsPosition : 'left'
    ,responsiveSinglePage : true
    ,responsiveHandleWidth : 50

    ,pageNumbers : false
    ,flipSound : true
    ,shadows : false
    ,turnPageDuration : 450
    ,zoomStep : 1
    ,zoomMax : 3

    ,container: true
    ,containerHeight: "100%"
    ,containerPadding: "20px"

    ,toc: [
      [ "Personalise Your Wealth", 1 ],
      [ "Portfolio of Services", 2 ],
      [ "Wealth Solutions", 3 ],
      [ "The Premier Lifestyle",4 ],
      [ "Maybank Premier Save Up Programme", 5],
      [ "Exclusive Privileges with Maybank Premier World Mastercard", 6 ],
    ]
  };

  $('#book').wowBook( bookOptions );

})
