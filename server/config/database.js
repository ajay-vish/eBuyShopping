module.exports = {
    database: process.env.PASSWORD ? 
    `mongodb+srv://root:${process.env.PASSWORD}@shopping.fyrzl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` 
    :'mongodb://localhost:27017/eCartShopping'
}