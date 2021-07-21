const stripe = require("stripe")("sk_test_YFN5WClz2bGCVdcFi7K3QMlh00RFo5jpbA");
const { v4: uuidv4 } = require("uuid");

exports.createPaymentIntent = async (req, res) => {
	const { amount } = req.body;
	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: amount * 100,
		currency: "inr",
	});
	res.send({
		client_secret: paymentIntent.client_secret,
	});
};
