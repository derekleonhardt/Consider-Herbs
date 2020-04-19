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
module.exports = {
    postCharge
};