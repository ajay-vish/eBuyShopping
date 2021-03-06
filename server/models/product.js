const mongoose = require("mongoose");
const { ObjectId } = new mongoose.Schema();
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
		},
		description: {
			type: String,
			trim: true,
			required: true,
			maxlength: 2000,
		},
		price: {
			type: Number,
			required: true,
			maxlength: 32,
			trim: true,
		},
		category: {
			// referencing the Category schema
			type: mongoose.Schema.ObjectId,
			ref: "Category",
			required: true,
		},
		stock: {
			type: Number,
		},
		sold: {
			type: Number,
			default: 0,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		available:{
			type:Boolean,
			default:true,
		},

	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Product", productSchema);
