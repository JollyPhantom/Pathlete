var express = require('express');
var router = express.Router();
var request = require('request');

// Requiring middleware:
// var bodyParser     = require('body-parser');

var Users = require('./users/controller.js');
var Tournaments = require('./tournaments/controller.js');
console.log('users : ', Users);
console.log('Tournaments : ', Tournaments);


var passport = require('passport');
var FitbitApiClient = require('fitbit-node');
var fitbitControl = require('./utils/fitbit.js');

var mongoose       = require('mongoose');
var dbPath         = process.env.dbPath || 'mongodb://localhost/fitMunk';
//connect to mongo
mongoose.connect(dbPath);

//Middleware:
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

passport.serializeUser(function(user, done) {
  // console.log('serializeUser', arguments);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(fitbitControl.fitbitStrategy);
  router.get('/auth/fitbit', passport.authenticate('fitbit', { failureRedirect: '/login' }), function (req,res) {
});

// Tourney API
router.get('/api/tournaments/public', Tournaments.read);
router.get('/api/tournaments/:tournament_id', Tournaments.read);
router.post('/api/tournaments/:user_id', Tournaments.create);
//PUT:
//declineInvite
router.put('/api/tournaments/:tournament_id/decline', Tournaments.inviteHandler);
// //acceptInvite
router.put('/api/tournaments/:tournament_id/accept', Tournaments.inviteHandler);
// //sendInvite
router.put('/api/tournaments/:tournament_id/invite', Tournaments.inviteHandler);
// //end
// router.put('/api/tournaments/:tournament_id/end', tournaments.end);
router.put('/api/tournaments/:tournament_id', Tournaments.update);
router.delete('/api/tournaments/:tournament_id', Tournaments.delete);

// User Tournament API
router.get('/api/tournaments/:username', Users.getTournaments); //body: action: public or private;

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/login', function (req, res, next){
  res.redirect('/auth/fitbit');
});

router.get('/auth/fitbit/callback', passport.authenticate('fitbit', { failureRedirect: '/login' }), function (req,res) {
  console.log(res.session);
  res.redirect('/progress');
});

router.get('/userdata', function(req, res) {
  Users.getUserStats(req.user.encodedId).once('value', function(data) {
      res.send(data.val());
    });
});

module.exports = router;
