const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        id:
        {
            type: Number
        },
        name: {
            type: String
        },
        sizes: {
            type: Array
        },
        material: {
            type: String
        },
        price: {
            type: Number
        },
        quantities: {
            type: Array
        },
        img: {
            type: String
        },
        description:{
            type:String
        }
    },
    { timeStamp: true }
)

const Product = mongoose.model("products", productSchema)
module.exports = Product