const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/pay', async (req, res) => {
  const { amount, currency, receipt_email } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      receipt_email,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      message: 'Payment initiated successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error });
  }
});

module.exports = router;
