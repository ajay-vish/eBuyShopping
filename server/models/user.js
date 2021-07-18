const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
var userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 32,
			trim: true,
		},
		lastname: {
			type: String,
			maxlength: 32,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},

		userinfo: {
			type: String,
			trim: true,
		},
		encry_password: {
			type: String,
			required: true,
		},

		salt: String,
		role: {
			type: Number,
			default: 0,
		},
		purchases: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

// this is a virtual field
// in this we take the plain password and encrypt the password using securePassword method
userSchema
	.virtual("password")
	//setter function of this field
	.set(function (password) {
		this._password = password;
		this.salt = uuidv1();
		this.encry_password = this.securePassword(password);
	})
	//getter function of this field
	.get(function () {
		return this._password;
	});

// here we declare all the methods for this schema
userSchema.methods = {
	// to authenticate user (which can be login) where we encrypt the password
	// entered by user and match it with encry_password
	authenticate: function (plainpassword) {
		return this.securePassword(plainpassword) === this.encry_password;
	},

	// here we encrypt the plain password by using crypto package from node
	// we use salt created using uuid then we save that in salt and encrypt password
	// we save encrypted password in the encry_password field
	securePassword: function (plainpassword) {
		if (!plainpassword) return "";

		try {
			return crypto
				.createHmac("sha256", this.salt)
				.update(plainpassword)
				.digest("hex");
		} catch (err) {
			return "";
		}
	},
};

module.exports = mongoose.model("User", userSchema);
