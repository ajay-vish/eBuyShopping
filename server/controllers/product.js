const Product = require("../models/product");
const Category = require("../models/category");
const formidable = require("formidable");
const util = require('util');
const _ = require("lodash");
const fs = require("fs");
const product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate("category")
		.exec((err, prod) => {
			if (err) {
				return res.json({
					error: "Product not found",
				});
			}
			var buffer = prod.photo.data;
			var string =
				"data:" +
				prod["photo"]["contentType"] +
				";base64," +
				buffer.toString("base64");
			prod["photo"]["contentType"] = string;
			req.product = prod;
			next();
		});
};

exports.createProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.json({
				error: "problem with image",
			});
		}
		const { name, description, price, category, stock } = fields;
		if (!name || !description || !price || !category || !stock) {
			return res.json({
				error: "Please include all fields",
			});
		}

		let product = new Product(fields);
		//handle file here
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.json({
					error: "File size too big!",
				});
			}

			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}

		//save to DB
		product.save((err, product) => {
			if (err) {
				return res.json({
					error: "Saving tshirt in DB failed",
				});
			}

			res.json({success:true,product});
		});
	});
};

exports.getProduct = (req, res) => {
	return res.json(req.product);
};

//middleware
exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		return res.send({photo: req.product.photo.contentType});
	}
	next();
};

// Product.update( {}, {'$set': {"available":true}}, false, true ).exec((err,product)=>{
// 	if (err) {
// 		return res.json({
// 			error: "Failed to delete product",
// 		});
// 	}
// 	return res.json()
// });
//delete Producct
exports.deleteProduct = (req, res) => {
    const product = req.product;    
	Product.updateOne({_id:product._id},{$set:{available:false}}).exec((err,product)=>{
        if (err) {
			return res.json({
				error: "Failed to delete product",
			});
		}
		return res.json({
			success:true,	
			message: "Successfully deleted",
		});
    })
    // product.remove((err, product) => {
    //  if (err) {
    //      return res.json({
    //          error: "Failed to delete product",
    //      });
    //  }
    //  res.json({
    //      message: "Successfully deleted",
    //  });
    // });
};


//update Product
exports.updateProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields, file) => {
		console.log(fields);
		if (err) {
			return res.json({
				error: "problem with image",
			});
		}

		//updation code
		let product = req.product;
		console.log("CONTENTTYPE");
		console.log(product['photo'].contentType.split(';')[0]);
		product['photo'].contentType = product['photo'].contentType.split(';')[0].substring(5);

		product = _.extend(product, fields);
		//handle file here
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.json({
					error: "File size too big!",
				});
			}

			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		
		//save to DB
		product.save((err, product) => {
			if (err) {
				return res.json({
					error: "Updation in DB failed",
				});
			}
			res.json({success:true,product});
		});
	});
};

exports.getProducts = (category, callback) => {
	callback(null, category);
}

//product listing
exports.getDisplayProducts = (req, res) => {
	Category.find()
		.exec((err, category) => {
			if (err) {
				return res.json({
					error: "No products found",
				});
			}
			const product = util.promisify(this.getProducts);
			product(category)
			.then(async (category) => {
				let productArr = [];
				for(let i = 0; i < category.length; i++){
					await new Promise(resolve => setTimeout(resolve, category.length * 5));
					Product.find({category: category[i]._id, available: true})
					.populate("category")
					.select("-photo")
					.limit(10)
					.exec((err, products) => {
						if (err) {
							return res.json({
								error: "No products found",
							});
						}
						if(products.length > 0)
						for(let j = 0; j < products.length; j++){
							if(products[j] != undefined)
							productArr.push(products[j])
						}
					});
				}
				return productArr;
			}).then((resp)=>{
				res.json({
					success: true,
					data: resp,
				});
			})
		});
}

exports.getProductsOfCategory = (req,res) =>{
	let categoryId = req.params.categoryId
	if(categoryId){
	Product.find({category: categoryId, available: true}).select("-photo").populate('category')
		.exec((err, products) => {
			if (err) {
				return res.json({
					error: "No products found",
				});
			}
		
			return res.json({
				success: true,
				data: products,
			});
		});
	}
	else{
		return res.json({
			error: "Category Id is empty.",
		});
	}
}

exports.getAllProducts = (req, res) => {
	let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
	Product.find()
		.populate("category")
		.select("-photo")
		.sort([[sortBy, "asc"]])
		.exec((err, products) => {
			if (err) {
				return res.json({
					error: "No products found",
				});
			}
			res.json({
				success: true,
				data: products,
			});
		});
};

exports.getAllUniqueCategories = (req, res) => {
	Product.distinct("category", {}, (err, category) => {
		if (err) {
			res.json({
				error: "No category found",
			});
		}
		res.json(category);
	});
};

exports.updateStock = (req, res, next) => {
	let myOperations = req.body.order.products.map((prod) => {
		return {
			updateOne: {
				filter: { _id: prod._id },
				update: { $inc: { stock: -prod.count, sold: +prod.count } },
			},
		};
	});

	Product.bulkWrite(myOperations, {}, (err, product) => {
		if (err) {
			res.json({
				error: "Operation failed",
			});
		}

		next();
	});
};
