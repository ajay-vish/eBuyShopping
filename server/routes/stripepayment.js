const express = require("express");
const router = express.Router();

const { createPaymentIntent } = require("../controllers/stripepayment");

// router.post("/stripepayment", makepayment)

//route to create a new payment intent (not complete payment just payment intent )
// returns client_secret used to complete payment
router.post("/create-payment-intent", createPaymentIntent);

module.exports = router;
