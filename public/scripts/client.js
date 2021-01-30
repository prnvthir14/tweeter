/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  
  //function that creates tweet elemet from request return obj
  const createTweetElement =  function (myObj) {
    //variable to store converted unix timestamp
    const daysAgo = moment(myObj.created_at).fromNow();

    const tweetArticle = `<article class="tweets">
    
        <header>
          <p id="avatar-username"> <img src="${myObj.user.avatars}">  ${myObj.user.name}</p>
          <p id="avatar-username">${myObj.user.handle}</p>  
        </header>
        <div id="tweet-content">${myObj.content.text}
        </div>             
        <footer>
          <p id="daysAgo"> ${daysAgo} </p>
          <p class="icons hidden"> &#9872 &#8635 &#9829 </p>              
        </footer>      
      </article>
      <p></p>`;
    return tweetArticle;  
  
  }


  const renderTweets = function (myArrayOfObjects) {
    
    $('.tweet-container').empty();

    for (let obj of myArrayOfObjects) {

      //call createTweetElement on each object coming from data obj
      const tweetMarkUp = createTweetElement(obj);
      
      $('.tweet-container').prepend(tweetMarkUp);

    }

    //functionality to hide and show handle
    $('.tweets').mouseover(function (event) {
    $(event.currentTarget).children('footer').children('.icons').removeClass('hidden')
    })
      
    $('.tweets').mouseleave(function (event) {
     $(event.currentTarget).children('footer').children('.icons').addClass('hidden');
      
    })

  }


  //function to fetch tweets from /tweets; - ajax get req.
  const loadtweets = function() {
    const url = '/tweets';
    
    $.ajax({
      url,
      method: 'GET',
      dataType: 'JSON'
    })
    .done((result) => {
      //if successful; render tweet
      renderTweets(result);
    })
    .fail(() => {
      //unsuccesful
      console.log('error, could not load tweet(s).');
    })
    .always(() => {
      console.log('get request complete');
    })

  }  

  loadtweets();


  //handling of submit event emitted from form
  $('#submit-frm').submit(function(event) {
    //prevent default form-submission
    event.preventDefault();
    
    let tweetMessage = $('#tweet-text').val();
  
    //error handling before post request
    if (!(tweetMessage) ) {
      //no empty tweets
      $( "#error" ).text('tweet cannot be empty');
      
    } else if (tweetMessage.length > 140){
      //tweet cannot be longer than 140 characters
      $( "#error" ).text('TOOO LONGGGGG, 140 characters used to be enough!!');
      
    } else {
      //carry out AJAX post to /tweets - data needs to be serialized before post
      $.ajax({
      url: '/tweets',
      type:'POST',
      data: $(this).serialize()}).done(() => {loadtweets()})
      
      //clear form after submission
      $(this).find('input').val('');

      //reset counter
      $(this).find('output').val(140); 
      //clear  
      $( "#error" ).text('');      

    }   
 
  })
  
})

