const express  = require("express")
const router = express.Router();

const {getProductById,createProduct,getAllUniqueCategories,getProduct,getAllProducts,photo,deleteProduct,updateProduct} =require("../controllers/product")
const {isSignedIn,isAdmin,isAuthenticated} =require("../controllers/auth")
const {getUserById} =require("../controllers/user")

//params
router.param("userId",getUserById)
router.param("productId",getProductById)


//routes
//create
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)
//read routes
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//delete route
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);

//update route
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);


//listing route
router.get("/products",getAllProducts)

router.get("/products/categories",getAllUniqueCategories)

module.exports =router;

