var _ = require('underscore'),
	redis = require('redis');

function StoryChooser(opts) {
	_.extend(this, {
		environment: 'production',
		keywords: [
			'gamification',
			'pivot',
			'pivots',
			'growth hacking',
			'social network',
			'responsive',
			'geolocation',
			'big data',
			'infographic',
			'infograph',
			'social enterprise',
			'rockstar',
			'freemium'
		],
    	client: process.env.REDISTOGO_URL ? require('redis-url').connect(process.env.REDISTOGO_URL) : redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)
	}, opts);

	this.publishedStoriesKey = this.environment + '_stories_published';
}

StoryChooser.prototype.chooseStory = function(stories, callback) {
	var candidateStories = this._findCandidateStories(stories);
	console.log('found', candidateStories.length, 'stories');
	
	this._chooseStoryForPublication(candidateStories, function(story) {
		callback(story);
	})		
};

StoryChooser.prototype._findCandidateStories = function(stories) {
	var _this = this,
		candidateStories = [];
	stories.forEach(function(story) {
		_this.keywords.forEach(function(keyword) {
			if (story.title.toLowerCase().indexOf(keyword) > -1) {
				candidateStories.push(story);
			}
		});

	});
	return candidateStories;
};

StoryChooser.prototype._chooseStoryForPublication = function(candidateStories, callback) {
	var _this = this,
		story = candidateStories.shift();

	if (!story) {
		callback(undefined);
		return;
	}

	this.client.sismember(this.publishedStoriesKey, story.title, function(err, isMember){
		if (err) {
			console.log(err);
			callback(undefined);
		}

		if (isMember) {
			_this._chooseStoryForPublication(candidateStories, function(story){
				callback(story);
			});
		} else {
			_this.client.sadd(_this.publishedStoriesKey, story.title, function(){
				callback(story);
			})
		}
	})
};

exports.StoryChooser = StoryChooser;