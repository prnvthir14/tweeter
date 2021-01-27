/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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

  const renderTweets = function (myArrayOfObjects){

    for (let obj of myArrayOfObjects){

      //call createTweetElement on each object coming from data obj
      const tweetMarkUp = createTweetElement(obj);
      
      $('.tweet-container').append(tweetMarkUp);

    }

  }

  renderTweets(data);


})

