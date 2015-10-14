$(function(){

  var feed = 0;

  function twitterfeed(){
    var _url = 'http://localhost:9292/tweets';
      setInterval(function() {
        $.getJSON(_url,function(data){
        $(data).each(function(idx, obj){
          $(obj).each(function(key, value){
            if(value.id>feed){
              var row = '<tr><td>'+
                '<div class="container-fluid">'+
                  '<div class="row">'+
                    '<aside class="col-xs-3 col-sm-2">'+
                '<img src="imgs/elTincho.png" class="img-responsive user-icon"/>'+
              '</aside>'+
              '<section class="col-xs-9 col-sm-10">'+
              '<p>'+ value.username+':</br>'+value.message+'<br></p>'+
              '<p class="tweet-btn">'+
                '<button type="button" class="tweet-btn"><i class="icon-hand-left"></i></button>'+
                '<button type="button" class="tweet-btn"><i class="icon-rotate-left"></i></button>'+
                '<button type="button" class="tweet-btn"><i class="icon-star"></i></button>'+
              '</p>'+
            '</section>'+
            '</div>'+
          '</div>'+
          '</td></tr>';
              $(row).prependTo("#tweetstable > tbody");
              feed++;
              console.log(feed);
            }
          });
      });
    });
  }, 2000);
  }

  $(window).on("load", twitterfeed());

  $(window).on("load resize", function(){
    $(".fill-screen").css("height", window.innerHeight);
  });

  $('body').scrollspy({
    target: '.navbar'
  });

  $('nav a').bind('click', function(){
    $('html, body').stop().animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

});

function postTweet(){
  var post = document.getElementById("tweet").value;
    $.ajax({
      type: "POST",
      url: "http://localhost:9292/tweets",
      // The key needs to match your method's input parameter (case-sensitive).
      data: JSON.stringify({"message":post,"username":"elTincho"}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: $("#tweet").val(""),
      failure: function(errMsg) {
          alert(errMsg);
      }
  });
}
