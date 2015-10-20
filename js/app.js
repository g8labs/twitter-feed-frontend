$(function(){

  var feed = 0;

  function somethingWentWrong(){
    alert("Oops! Something went wrong...");
  }

  function updateFeed(data){
    $(data).each(function(idx, obj){
      $(obj).each(function(key, value){
        if(value.id>feed){
          var ejsHtml = new EJS({url: 'ejs/tweeterFeed.ejs'}).render({post:obj});
          $('#tweetSection').prepend(ejsHtml);
          feed++;
        }
      });
    });
  }

  $(document).ready(function(){
    setInterval(function(){
      Twitter.loadTweets()
      .done(updateFeed)
      .fail(somethingWentWrong);
    }, 2000);

    $('body').scrollspy({
      target: '.navbar'
    });

    $('nav a').bind('click', function(){
      $('html, body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });

    $('#postBtn').click(postTweet);
  });

  function postTweet(){
    var post = $('#tweet').val();
    var username = "elTincho";
    Twitter.createTweet(username, post)
    .done(function(){$('#tweet').val("");})
    .fail(somethingWentWrong);
  }

  $(window).on("load resize", function(){
    $(".fill-screen").css("height", window.innerHeight);
  });



});
