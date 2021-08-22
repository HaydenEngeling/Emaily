const express = require('express');
require('./services/passport.js');

const app = express();
// app.get('/', (req, res) => {
//   res.send({ hi: 'there' });
// });

require('./routes/authRoutes.js')(app)




const PORT = process.env.PORT || 3000;
app.listen(PORT);