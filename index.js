const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js')
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./model/Users.js');
require('./model/Survey.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session())

// app.get('/', (req, res) => {
//   res.send({ hi: 'there' });
// });

require('./routes/authRoutes.js')(app)
require('./routes/billingRoutes.js')(app)
require('./routes/surveyRoutes.js')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);