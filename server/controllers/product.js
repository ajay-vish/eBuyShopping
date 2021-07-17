const Product = require("../models/product");
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById= (req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,prod)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }

        req.product =prod;
        next();

    })
}

exports.createProduct= (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            });
        }
        const{name,description,price,category,stock} =fields

        if(
            !name||
            !description||
            !price||
            !category||
            !stock
        ){
            return res.status(400).json({
                error: "Please include all fields"
            })

        }


        let product =new Product(fields)
        // console.log(product)
        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size too big!"
                })
            }

            product.photo.data =fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type;
        }

        //save to DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Saving tshirt in DB failed"
                });
            }

            res.json(product);
        })


    })

}

exports.getProduct= (req,res)=>{
    return res.json(req.product)
}

//middleware
exports.photo = (req,res,next)=>{
    
    if(req.product.photo.data){
        
        res.set("Content-type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}
//delete Producct
exports.deleteProduct= (req,res) =>{
    const product  = req.product;
    product.remove((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete product"
            })
        }
        res.json({
            message:"Successfully deleted"
        });
    })

}
//update Product
exports.updateProduct = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            });
        }
      

        //updation code
        let product = req.product;

        product = _.extend(product, fields)
        // console.log(product)
        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size too big!"
                })
            }

            product.photo.data =fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type;
        }

        //save to DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Updation in DB failed"
                });
            }

            res.json(product);
        })


    })
}

//product listing
exports.getAllProducts= (req,res)=>{
    let sortBy = req.query.sortBy ? req.query.sortBy :"_id"
    Product.find()
    .populate("category")
    .select("-photo")
    .sort([[sortBy,"asc"]])
     .exec((err,products)=>{
         if(err){
             return res.status(400).json({
                 error:"No products found"
             })
         }
         res.json({
             success: true,
             data : products
            })
     })
}

exports.getAllUniqueCategories =(req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            res.status(400).json({
                error:"No category found"
            })
        }
        res.json(category)
    })
}

exports.updateStock = (req,res,next)=>{
    let myOperations = req.body.order.products.map(prod =>{
        return {
            updateOne:{
                filter:{_id:prod._id},
                update:{$inc: {stock: -prod.count,sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations,{},(err,product)=>{
        if(err){
            res.status(400).json({
                error:"Bulk operation failed"
            })
        }

        next();
    })
    

}