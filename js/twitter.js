var Twitter = (function(){

  var tweetsUrl = 'http://localhost:9292/tweets';

  var loadTweets = function() {
    return $.getJSON(tweetsUrl);
  };

  var createTweet = function(username, message) {
    var data = {
      message: message,
      username: username
    };

    return $.post(tweetsUrl, JSON.stringify(data), null, 'json');
  };

  return {
    loadTweets: loadTweets,
    createTweet: createTweet
  };

})();
