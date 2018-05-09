//make sure expanded nav is visible after resize
$(document).ready(function() {
  var $window = $(window);

  function checkWidth() {
       var windowsize = $window.width();
       if (windowsize > 850) {
           //if the window is greater than 850px wide then show the expanded nav
           $('.mainnav').show();
       } else {
         $('.mainnav').hide();
       }
   }

   // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
});

// nav script expandable on mobile
$('#nav-toggle').on('click', function(){
  if( !($('.mainnav').is(':visible')) ){
    //$('.mainnav').slideUp();
    $('.mainnav').slideDown();
    $('#nav-toggle').toggleClass("active");
  } else {
    $('.mainnav').slideUp();
    $('#nav-toggle').toggleClass("active");
  }
});
