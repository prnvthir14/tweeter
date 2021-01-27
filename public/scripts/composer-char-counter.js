//This file will be solely responsible for this character counter.

//console.log('HIIIII')

$(document).ready(function() {
  
  //access HTML by ID
  $('#tweet-text').on('keyup', function () {
    //this refers to text in texaarea
    let inputLength = ($(this).val()).length;


    //access HTML by class
    $('.counter').val(140 - inputLength)

    //
    if ((140 - inputLength) >= 0 ){
      //black text
      $('.counter').removeClass('exceedsLimit');

    } else {
      //red text
      $('.counter').addClass('exceedsLimit');

    }
    
  })

});