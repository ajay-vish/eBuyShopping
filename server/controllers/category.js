const Category = require("../models/category");
const Product = require("../models/product");

exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, cate) => {
		if (err) {
			return res.json({
				error: "Category is not found",
			});
		}

		req.category = cate;
		next();
	});
};

exports.createCategory = (req, res) => {
	const category = new Category(req.body);
	category.save((err, category) => {
		if (err) {
			return res.json({
				error: "Some error occurred, Category not saved",
			});
		}

		res.json({ success: true, category });
	});
};

exports.getCategory = (req, res) => {
	return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
	Category.find().exec((err, items) => {
		if (err) {
			return res.json({
				error: "No categories found",
			});
		}

		res.json({ success: true, items });
	});
};

exports.updateCategory = (req, res) => {
	const category = req.category;
	category.name = req.body.name;
	category.save((err, updatedCategory) => {
		if (err) {
			return res.json({
				error: "Failed to update category",
			});
		}
		res.json({ success: true });
	});
};

exports.removeCategory = (req, res) => {
	
	const category = req.category;
	category.remove((err, category) => {
		if (err) {
			return res.json({
				error: "Failed to delete category",
			});
		}
		
		Product.update({category:category._id},{$set:{available:false}}).exec((err,product)=>{
			if (err) {
				return res.json({
					error: "Failed to delete product",
				});
			}
			return res.json({
				message: "Successfully deleted products",
			});
		});


		// res.json({
		// 	success: true,
		// 	message: "Successfully deleted",
		// });
	});
};
