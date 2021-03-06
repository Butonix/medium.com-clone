const Authentication = require('./controllers/authentication');
const Story = require('./controllers/story');
const Comment = require('./controllers/comment');
const passportService = require('./services/passport');
const passport = require('passport');
const path = require('path');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/api', Story.showStories);
  app.post('/api/signin', requireSignin, Authentication.signin);
  app.post('/api/signup', Authentication.signup);
  app.post('/api/new-story', Story.newStory);
  app.post('/api/story/:id/new-comment', Comment.newComment);
  app.get('/api/story/:id/comments', Comment.fetchComments);
  app.get('/api/story/:id', Story.readStory);
  app.get('/api/auth', requireAuth, function(req, res) {
  	res.send({ message: "blah blah blah..." })
  })
  app.get('*', (req, res) => {
  	res.sendFile(path.join(__dirname, '../../client/build/index.html'));
	});
}
