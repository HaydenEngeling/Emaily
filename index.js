const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js')
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./model/Users.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();
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




const PORT = process.env.PORT || 3000;
app.listen(PORT);