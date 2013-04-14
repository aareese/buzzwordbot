var assert = require('assert'),
	RSSReader = require('../lib').RSSReader,
	fs = require('fs');

suite('buzzwordbot', function() {
  test('getArticles should return an array of articles from RSS feed', function(done) {
    var rssreader = new RSSReader(),
    	article = fs.readFileSync('./test/fixtures/techcrunch.rss').toString();

    rssreader._getRawFeed = function(callback) {
    	callback(null, article);
    };

   	rssreader.getArticles(function(err, articles) {
			assert.equal(articles[0].title, "Bitcoin Miners Are Racking Up $150,000 A Day In Power Consumption Alone");
			done();
		});

  });
});
