var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

	local: {
		email: String,
		password: String,
		verified: Boolean
	},

	localVerify:{
		userId: String,
		verificationToken: String
	},

	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},

	google: {
		id: String,
		token: String,
		email: String,
		name: String	
	},

	twitter: {
		id: String,
		token: String,
		username: String,
		name: String		
	},

	linkedin: {
		id: String,
		token: String,
		name: String,
		email: String
	},

	github: {
		id: String,
		name: String,
		profileUrl: String
	}
});

userSchema.methods.generateHash = function(password) {
	console.log("generateHash");
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	console.log("compareHash");
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);