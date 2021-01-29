/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  //function that creates tweet elemet from request return obj
  const createTweetElement =  function (myObj) {

    //this function will take values from myOBJ and render and HTML article that will be inserted in .tweet-container section. 
    //refactor html indents
    const tweetArticle = `<article class="tweets">
    
        <header>
          <p id="avatar-username"> <img src="${myObj.user.avatars}">  ${myObj.user.name}</p>
          <p class="handle hidden">${myObj.user.handle}</p>  
        </header>
        <div id="tweet-content">${myObj.content.text}
        </div>             
        <footer>
          <p> ${myObj.created_at} </p>
          <p> &#9872 &#8635 &#9829 </p>              
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
    $(event.currentTarget).children('header').children('.handle').removeClass('hidden')
    })
      
    //
    $('.tweets').mouseleave(function (event) {
     $(event.currentTarget).children('header').children('.handle').addClass('hidden');
      
    })

  }


  //function to fetch tweets from /tweets; - ajax get req.
  const loadtweets = function () {
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
  $('#submit-frm').submit(function (event) {
    //console.log('hi')
    //prevent default form-submission
    event.preventDefault();

    //USE .TEXT() HERE TO SANITIZE THE INPUT 

    // //read data from submit from releveant element (in this case the grand-child of our form element who is an input elemet with type = text)
    //tweetMessage is an object 
    
    let tweetMessage = $('#tweet-text').val();
    
    if (!(tweetMessage) ) {
      //log needd to display tweet cannot be empty/null
      //here, we need some jqeuery to display tweet cannot be empty 
      //window.alert('tweet cannot be empty')
      //targets handle in new tweet container; want to target section class="new-tweet"      
      $( "#error" ).text('tweet cannot be empty');
      
    } else if (tweetMessage.length > 140){
      //log tweet length is too much
      //here, we need some jqeuery to display tweet cannot be empty 
      
      $( "#error" ).text('TOOO LONGGGGG, 140 characters used to be enough!!');
      

    } else {
      //carry out AJAX post to /tweets
      $.ajax({
      url: '/tweets',
      type:'POST',
      // data:$(this).serialize()}).done((data) => {console.log('Loading tweet'); loadtweets()})
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

