var assert = require('assert'),
	Tweeter = require('../lib').Tweeter,
	sinon = require('sinon');

describe('Tweeter', function(){
	describe("#formatArticleForTweet", function(){
		// Twitter shortens links to 22 characters
		// Need one character for space
		// We have 119 characters
		it('should tweet the title of article up to 119 characters', function(){
			var tweeter = new Tweeter(),
				status = tweeter.createStatusFromArticle({
				title: "Be a Mean Mom",
				link: "http://www.foxnews.com/opinion/2013/04/28/be-mean-mom-protect-your-child-from-cyberbullying/"
			});

			assert(status.indexOf("Be a Mean Mom") > -1);
			assert(status.indexOf("http://www.foxnews.com/opinion/2013/04/28/be-mean-mom-protect-your-child-from-cyberbullying/") > -1);
		});

		it('should shorten the title and add an elipses at the end if the title is too long', function(){
			//elipses is one character
			//if article is too long we have 118 characters
			var tweeter = new Tweeter(),
				article = {
					title: "Bar Power Is A Nightlife App To Help You Be Less Of A Jerk At Bars Bar Power Is A Nightlife App To Help You Be Less Of A Jerk At Bars",
					link: "http://www.foxnews.com"
				},
				status = tweeter.createStatusFromArticle(article)

				assert.equal(status.length - ' '.length - article.link.length, 117);
				assert(status.indexOf("…") > -1);
				assert.equal(status.length, 140);
		});
		
	});
});