var assert = require('assert'),
	RSSReader = require('../lib').RSSReader;

suite('buzzwordbot', function() {
  test('getItems should return an array of current news items', function() {
    var rssreader = new RSSReader();

   	rssreader.getItems(function(items) {
			assert.equal(items[0].title, "Bitcoin Miners Are Racking Up $150,000 A Day In Power Consumption Alone");
		});

  });
});
