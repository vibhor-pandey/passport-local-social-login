var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').OAuth2Strategy;
var GitHubStrategy = require('passport-github').Strategy;

var regex = require('regex-email');
var uuid = require('node-uuid');
var nodemailer = require('nodemailer'); 
var smtpTransport = require('nodemailer-smtp-transport');


var User = require('../app/models/user.js');
var  configAuth = require('./auth');

module.exports = function(passport) {
	
	console.log("passport.js");
	passport.serializeUser(function(user, done) {
		console.log("Serialize");
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		console.log("De-Serialize");
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback: true	
		},
		function(req, email, password, done) {

			process.nextTick(function() {

				if(regex.test(email))
				{
					User.findOne({'local.email' : email}, function (err, user) {
						if(err){
							console.log("findOne-err");
							return done(err);
						}
						if(user){
							console.log("findOne-user");
							return done(
								null, 
								false, 
								req.flash('signupMessage', 'That email is already taken.')
							);
						}
						else{
							console.log("findOne-new-user");
							var newUser = new User();
							newUser.local.email    = email;
							newUser.local.password = newUser.generateHash(password);
							newUser.local.verified = false;
							console.log("hash generated...");
							newUser.save(function(err) {
								if (err){
								    console.log("error generated...");
								    throw err;
						        	}
						//console.log(uuid.v4());
					                return done(
					                   	null,
					                    	newUser, 
					                    	req.flash('loginMessage', 'Successfully Registered!')
					                    );
							});
						}
					});
				}
				else{
					return done(
						null, 
						false, 
						req.flash('signupMessage', 'Oops!! Enter Valid Email Address')
					);
				}
			});
		}
	));

	passport.use('local-login', new LocalStrategy({
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback : true
		},
		function(req, email, password, done) {
			User.findOne({'local.email': email}, function(err, user) {
				if(err){
					return done(err);
				}
				if(!user){
					return done(
						null, 
						false, 
						req.flash('loginMessage','Oops Invalid Email..!')
					);
				}

				if(!user.validPassword(password)){
					return done(
						null, 
						false, 
						req.flash('loginMessage','Oops Wrong Password..!')
					);
				}
				//console.log(user + "qwe");
				return done(null, user);
			});
		}
	));


	//Loging Strategy Using Google OAuth
	passport.use('google', new GoogleStrategy({
			clientID : configAuth.googleAuth.clientID,
			clientSecret : configAuth.googleAuth.clientSecret,
			callbackURL : configAuth.googleAuth.callbackURL
		},
		function(token, refreshToken, profile, done) {
			process.nextTick(function() {
				User.findOne({'google.id' : profile.id}, function(err, user) {
					if(err){
						return done(err);
					}

					if(user){
						return done(null, user);
					}
					else{
						var newUser = new User();
						newUser.google.id = profile.id;
						newUser.google.token = token;
						newUser.google.name = profile.displayName;
						newUser.google.email = profile.emails[0].value;

						newUser.save(function(err) {
							if(err){
								throw err;
							}
							return done(null, newUser);	
						});
					}
				});
			});
		}

	));

	//Loging Strategy Using Twitter OAuth
	passport.use(new TwitterStrategy({
			consumerKey : configAuth.twitterAuth.consumerKey,
			consumerSecret : configAuth.twitterAuth.consumerSecret,
			callbackURL : configAuth.twitterAuth.callbackURL
		},
		function(token, tokenSecret, profile, done) {
			console.log("ggfgd");
			process.nextTick(function() {

				User.findOne({'twitter.id' : profile.id}, function(err, user) {
					if(err){
						return done(err);
					}
					if(user){
						return done(null, user);
					}
					else{
						var newUser = new User();
						newUser.twitter.id = profile.id;
						newUser.twitter.token = token;
						newUser.twitter.username = profile.username;
						newUser.twitter.name = profile.displayName;

						newUser.save(function(err) {
							if(err)
								throw err;
						return done(null, newUser);
						});
					}
				});
			});
		}
	));


	passport.use(new LinkedInStrategy({
			clientID : configAuth.linkedinAuth.clientID,
			clientSecret : configAuth.linkedinAuth.clientSecret,
			callbackURL : configAuth.linkedinAuth.callbackURL,
			scope: ['r_emailaddress', 'r_basicprofile']
		},
		function(token, tokenSecret, profile, done) {
			console.log("ggfgd");
			process.nextTick(function() {

				User.findOne({'linkedin.id' : profile.id}, function(err, user) {
					if(err){
						console.log(err);
						return done(err);
					}
					if(user){
						return done(null, user);
					}
					else{
						//console.log(profile);
						var newUser = new User();
						newUser.linkedin.id = profile.id;
						newUser.linkedin.token = token;
						newUser.linkedin.name = profile.displayName;
						newUser.linkedin.email = profile.emails[0].value;
						newUser.save(function(err) {
							if(err)
								throw err;
						//console.log(profile.displayName);
						return done(null, newUser);
						});
					}
				});
			});
		}
	));



	passport.use(new GitHubStrategy({
			clientID : configAuth.githubAuth.clientID,
			clientSecret : configAuth.githubAuth.clientSecret,
			callbackURL : configAuth.githubAuth.callbackURL
		},
		function(token, tokenSecret, profile, done) {
			console.log("ggfgd");
			process.nextTick(function() {

				User.findOne({'github.id' : profile.id}, function(err, user) {
					if(err){
						console.log(err);
						return done(err);
					}
					if(user){
						return done(null, user);
					}
					else{
						console.log(profile);
						var newUser = new User();
						newUser.github.id = profile.id;
						newUser.github.name = profile.username;
						newUser.github.profileUrl = profile.profileUrl;
						newUser.save(function(err) {
							if(err)
								throw err;
						//console.log(profile.displayName);
						return done(null, newUser);
						});
					}
				});
			});
		}
	));
};
