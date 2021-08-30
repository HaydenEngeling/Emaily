const keys = require('../config/keys.js')
const stripe = require('stripe')('sk_test_51JTuKsHRpgRMIUFi4fP25sC0TvZL90HJYs3hReafc83uzgq0ldG9RLcZs6E0BiG68t6WOSyojXSSFrgZOQt77h2I00Dr6FUSXF');
const requireLogin = require('../middlewares/requireLogin.js');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  })
}
