const stripe = require('stripe')("sk_test_6rCNDxDb2pGYE6RfW2o2l82l00HhRUqmpq")

async function postCharge(req, res, next) {
  try {
    const { amount, source, receipt_email } = req.body

    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source,
      receipt_email
    })

    if (!charge) throw new Error('charge unsuccessful')

    req.charge = charge;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}



async function subscribe(req, res, next) {
  try {
    const customer = await stripe.customers.create({
      payment_method: req.body.payment_method,
      email: req.body.email,
      invoice_settings: {
        default_payment_method: req.body.payment_method
      }
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: "plan_H7vSJjpJQiQ1Nf" }],
      expand: ["latest_invoice.payment_intent"]
    });
    req.customer = customer;
    req.subscription = subscription;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
    postCharge,
    subscribe
};