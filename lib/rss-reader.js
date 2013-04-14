var _ = require('underscore'),
	jDistiller = require('jdistiller').jDistiller;

function RSSReader(opts) {
  this.parser = this._createParser();
}

RSSReader.prototype._createParser = function() {
  return new jDistiller()
    .set('items', 'item', function(element) {

      // link is a reserved word in HTML, and is
      // collapsed by JSDom into a self-closing
      // element, we can grab the link out by looking
      // for a dangling text node.
      var link = element
        .contents()
        .filter(function() {
          return this.nodeType === 3;
        });

      return [{
        title: element.find('title').text().trim(),
        href: link.text().trim()
      }]
    });
};

RSSReader.prototype.getItems = function(callback) {
	this._parseFeed(callback);
};

RSSReader.prototype._parseFeed = function (callback){
	var data = "<atom><item><title>Bitcoin Miners Are Racking Up $150,000 A Day In Power Consumption Alone</title><link>http://techcrunch.com/2013/04/13/the-cost-of-a-bitcoin/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+Techcrunch+%28TechCrunch%29&utm_content=FeedBurner</link></item></atom>"
	this.parser.distillString(data, function(error, items){
		callback(items.items);
	});
};

exports.RSSReader = RSSReader;