/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  // Test / driver code (temporary). Eventually will get this from the server.
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  //function that creates tweet elemet from request return obj
  const createTweetElement =  function (myObj) {

    //this function will take values from myOBJ and render and HTML article that will be inserted in .tweet-container section. 
    //refactor html indents
    const tweetArticle = `<article>
    
        <header>
          <p>${myObj.user.avatars} ${myObj.user.name}</p>
          <p>${myObj.user.handle}</p>  
        </header>
        <div>${myObj.content.text}
        </div>             
        <footer>
          <p> ${myObj.created_at} </p>
          <p> &#9872 &#8635 &#9829 </p>              
        </footer>
      </article>`;
    
    return tweetArticle;
  
  
  }
  

  //test code - createTweetElement fn;
  // const $tweet = createTweetElement(tweetData);
  
  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  const renderTweets = function (myArrayOfObjects) {

    for (let obj of myArrayOfObjects) {

      //call createTweetElement on each object coming from data obj
      const tweetMarkUp = createTweetElement(obj);
      
      $('.tweet-container').append(tweetMarkUp);

    }

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


  //renderTweets(data);

  //handling of submit event emitted from form
  $('#submit-frm').submit(function (event) {
    //console.log('hi')
    //prevent default form-submission
    event.preventDefault();

    // //read data from submit from releveant element (in this case the grand-child of our form element who is an input elemet with type = text)
    //tweetMessage is an object 
    const tweetMessageSerialized = $(this).serialize();
    //console.log(tweetMessageSerialized)

    //carry out AJAX post to /tweets

    $.ajax({
      url: '/tweets',
      type:'POST',
      data:tweetMessageSerialized}).done((data) => {console.log('Loading tweet'); loadtweets()})


    // const url = '/tweets';
    // $.ajax({
    //   url,
    //   method: 'POST',
    //   dataType: 'JSON',
    //   data:tweetMessageSerialized,
    //   success: function() {console.log('Loading tweet'); loadtweets()} ,
    //   error: function(err) {console.log(err)} 
    // })
    // .done(() => {
    //   console.log('Tweet posted.');
    // // })
    // .fail ( () => {
    //   console.log('error, could not post tweet(s).');
    // })
    // .always( () => {
    //   console.log('post request complete');
    // })
      
    //clear form after submission
    $(this).find('input').val('');

  })





})

