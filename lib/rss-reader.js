var _ = require('underscore'),
	FeedParser = require('feedparser'),
	request = require('request');

function RSSReader(opts) {
  this.feedURL = "http://feeds.feedburner.com/TechCrunch/";
}

RSSReader.prototype.getArticles = function(callback) {
  var _this = this;
  this._getRawFeed(function(err, feed) {

    if (err) callback(err, feed);

    var articles = [];

    FeedParser.parseString(feed)
      .on('article', function(article) {
        articles.push({
          title: article.title,
          link: article.link,
          description: article.description || '',
        });
      })
      .on('end', function() {
        callback(null, articles);
      });
  });
};

RSSReader.prototype._getRawFeed = function(callback) {
  request({
    url: this.feedURL
  }, function(err, res, feed) {
    
    if (!res) {
      err = new Error('empty response');
    } else if (res.statusCode < 200 || res.statusCode >= 300) {
      err = new Error('http status ', res.statusCode) 
    }

    callback(err, feed);
  });
};


exports.RSSReader = RSSReader;