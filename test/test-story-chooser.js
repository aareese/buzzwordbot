var assert = require ('assert'),
	StoryChooser = require('../lib').StoryChooser,
	sinon = require('sinon'),
	redis = require('redis');

describe('StoryChooser', function() {
	describe('#chooseStory', function(){

		beforeEach(function() {
			client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
			client.del('test_stories_published');
		});

		it('should choose stories based on a set of keywords', function(done) {
			var storyChooser = new StoryChooser({
				environment: 'test'
			})
			storyChooser.chooseStory ([
			{
				title: 'gamification will make you rich'
			},{
				title: 'it rained today'
			}
			], function(chosenStory) {
				assert.equal('gamification will make you rich', chosenStory.title)
				done();
			});
		});

		it('should not allow the same story to be published twice', function(done) {
			var storyChooser = new StoryChooser({
				environment: 'test'
			})
			storyChooser.chooseStory ([{title: 'gamification will make you rich'}], function(chosenStory) {
				assert.equal('gamification will make you rich', chosenStory.title)
				storyChooser.chooseStory ([{title: 'gamification will make you rich'}], function(chosenStory) {
					assert.equal(undefined, chosenStory);
					done();
				});
			});
		});

		it('should rank stories higher that match multiple keywords', function(done) {
			done();
		});
	});
});