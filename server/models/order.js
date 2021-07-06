const mongoose = require('mongoose');
const {ObjectId} = new mongoose.Schema


// this is the Cart schema 
const CartSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number
})


//this is the Order schema 
const orderSchema = new mongoose.Schema({
    products: [CartSchema],
    payment_id:{},
    amount:{type:Number},
    address: String,
    status:{
        type:String,
        default:"Received",
        enum :["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    updated : Date,
    user :{
        type: mongoose.Schema.ObjectId,
        ref :"User"
    }
},{
    timestamps:true
})

const Order = mongoose.model("Order",orderSchema);
const ProductCart = mongoose.model("ProductCart",ProductCartSchema);

module.exports ={Order,ProductCart};