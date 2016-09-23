passport-local-social-login
A tutorial for a basic passport example of social/local signup & login 
•	Overview
•	Prerequisites
•	Client ids/secrets from third party
•	Tutorial

Overview

This example is for Social as well as Local Login/Signup using Passport-Strategy in Node.js
In this Project, I use Social Sign/Login for :

Google, 
LinkedIn,
GithHub, 
Twitter 

By using their APIs aka (3rd Party APIs).

Prerequisites

Before starting this tutorial, make sure you have the following installed:
•	Node
•	NPM

Client ids/secrets from 3rd party APIs

•	google
•	linkedIn
•	gitHub
•	twitter


Tutorial - Google

1. Clone the application
$ git clone https://github.com/vibhor-pandey/passport-local-social-login.git
$ cd passport-local-social-login
$ npm install

2. Get your client ids/secrets from third party(social logins)
•	To get your application Goto: https://console.developers.google.com
•	Create your application
•	Select proper category for your app.
•	Write your app name and "Site URL".
•	Collect the ClientId & ClientSecret
•	Set Website Origin URL
•	Set Callback URL

3. Run the application
$ node .
•	Open your browser to http://localhost:3000
•	Click on 'Google'.
•	Sign up using a local account, then link to your Google account.
