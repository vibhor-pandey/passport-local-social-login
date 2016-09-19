module.exports = function(app, passport) {
	
	//getting homepage on initial loading
	app.get('/', function(req, res) {
		res.render('index.ejs', { message: req.flash('Welcome') });	
	});

	//get method to load login page on clicking Login Button
	app.get('/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage')});
		//console.log(req.bodyParser.text());
		//console.log(JSON.stringify(req.body, null, 2));
	});


	//post request to login on clicking Login Button and render to next page based on result
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));



	// send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
	app.get('/auth/google',passport.authenticate('google', { scope : ['profile', 'email'] }));


    // the callback after google has authenticated the user
	app.get('/auth/google/callback', passport.authenticate('google',
			{
				successRedirect: '/profile',
				failureRedirect: '/'
			}
		));

	// send to twiiter to do the authentication
    // profile gets us their basic information including their name
    app.get('/auth/twitter', passport.authenticate('twitter'));

	// the callback after twitter has authenticated the user
	app.get('/auth/twitter/callback', passport.authenticate('twitter', 
		{
			successRedirect: '/profile',
			failureRedirect: '/',
		}
	));

	//route to sign up page using local strategy on clicking signup button
	app.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	//signup usnig local strategy
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
		failureFlash : true 
	}));


	//route to get profile after logging in
	app.get('/profile', isLoggedIn,function(req, res){
		res.render('profile.ejs', {user: req.user});
	});

	//route to logout
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	// send to linkedin to do the authentication
    // profile gets us their basic information including their name
	app.get('/auth/linkedin',
  		passport.authenticate('linkedin', { state: 'SOME STATE' })
  	);

	// the callback after linkedin has authenticated the user
  	app.get('/auth/linkedin/callback', 
	  	passport.authenticate('linkedin', { 
	  		successRedirect: '/profile',
	  		failureRedirect: '/' 
	  	}
	));

	// send to linkedin to do the authentication
    // profile gets us their basic information including their name
	app.get('/auth/github', passport.authenticate('github'));

	// the callback after linkedin has authenticated the user
  	app.get('/auth/github/callback', 
	  	passport.authenticate('github', { 
	  		successRedirect: '/profile',
	  		failureRedirect: '/' 
	  	}
	));

	//middleware function to make sure that user is logged In
	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated())
	        return next();
	    res.redirect('/');
	}

}