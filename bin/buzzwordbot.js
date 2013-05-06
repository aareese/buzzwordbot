#!/usr/bin/env node

var optimist = require('optimist'),
	RSSReader = require('../lib').RSSReader,
	Tweeter = require('../lib').Tweeter,
	StoryChooser = require('../lib').StoryChooser;

var argv = optimist
	.options('c', {
		alias: 'choose',
		describe: 'Choose a story to publish'
	})
	.usage("Usage:\n\
		\tbuzzwordbot --choose\tchoose a story to publish from our set of RSS feeds.\n\
		")
	.argv;

if (argv.choose) {
	console.log('grabbing stories from RSS feeds...')
	new RSSReader().readAllFeeds(function(err, stories) {
		if(err) {
			console.log('an error occured', err);
			return;
		}

		console.log('found ', stories.length, 'articles.')

		console.log('finding candidate stories to publish')
		new StoryChooser().chooseStory(stories, function(story) {
			if (story) {
			console.log('found story', story.title);
			new Tweeter().tweetArticle(story);
			} else {
				console.log ('no story found.')
			}
		});

	});
} else {
	console.log(optimist.help());
}