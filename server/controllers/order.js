const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
	Order.findById(id)
		.populate("products.product", "name price")
		.exec((err, order) => {
			if (err) {
				return res.json({
					error: "No order found in db",
				});
			}
			req.order = order;
			next();
		});
};

exports.createOrder = (req, res, next) => {
	req.body.order.user = req.profile;

	const order = new Order(req.body.order);
	order.save((err, order) => {
		if (err) {
			return res.json({
				error: "Failed to save your order in db",
			});
		}

		//passing order id(Object Id ) of above order in req
		req.body.order_id = order._id;
		res.json({
			success: true,
		});

		//continue to next middleware
		next();
	});
};

exports.getAllOrders = (req, res) => {
	Order.find()
		.sort({ createdAt: -1 })
		.populate("user", "_id name ")
		.exec((err, order) => {
			if (err) {
				return res.json({
					error: "No orders found in DB",
				});
			}

			res.json(order);
		});
};

exports.getMyOrders = (req, res) => {
	Order.find({
		user: {
			_id: req.params.userId,
		},
	})
		.populate("user", "_id name ")
		.sort({ createdAt: -1 })
		.exec((err, order) => {
			if (err) {
				return res.json({
					error: "No orders found in DB",
				});
			}

			res.json(order);
		});
};

exports.getOrderStatus = (req, res) => {
	res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
	Order.update(
		{ _id: req.body.orderId },
		{ $set: { status: req.body.status } },
		(err, order) => {
			if (err) {
				return res.json({
					error: "Cannot update order status ",
				});
			}
			res.json({ success: true, order });
		}
	);
};
