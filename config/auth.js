

module.exports = {

	'googleAuth' : {

		'clientID' : 'your google client id',
		'clientSecret' : 'your google client secret',
		'callbackURL' : 'http://localhost:3000/auth/google/callback'
	},

	'linkedinAuth' : {

		'clientID' : 'your linkedin client id',
		'clientSecret' : 'your google client secret',
		'callbackURL' : 'http://127.0.0.1:3000/auth/linkedin/callback'
	},

	'twitterAuth' : {

		'consumerKey' : 'your twitter consumer key',
		'consumerSecret' : 'your twitter consumer secret',
		'callbackURL' : 'http://127.0.0.1:3000/auth/twitter/callback'
	},

	'githubAuth' : {

		'clientID' : 'your github client id',
		'clientSecret' : 'your github client secret',
		'callbackURL' : 'http://127.0.0.1:3000/auth/github/callback'
	}
};
