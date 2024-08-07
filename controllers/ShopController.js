const express = require('express')
const Product = require('../models/Product')
const fs = require('fs')

const index = (req, res, next) => {

    res.end(fs.readFileSync('./shop.html'))
}

const allProducts = (req, res, next) => {
    Product.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: "An error occured"
            })
        })
}
const show = (req, res, next) => {
    res.end(fs.readFileSync('./product.html'))
}

const getProduct = (req, res, next) => {
    const id = req.params.productId;
    console.log(id)
    Product.find({ "id": id })
        .then(response => {
            res.json({
                response
            })
        }).catch(error => {
            res.json({
                message: "An error has occured"
            })
        })
}

const store = (req, res, next) => {
    Product.find().then(response => {
        let data = response
        return data
    }).then(data => {
        const id = data[data.length-1].id+1
        let product = new Product({
            id: id,
            name: req.body.name,
            sizes: req.body.sizes,
            material: req.body.material,
            price: req.body.price,
            quantities: req.body.quantities,
            img: req.body.img,
            description: req.body.description
        })
        product.save().then(response => {
            res.json({
                message: "Product added successfully"
            })
        }).catch(error => {
            res.json({
                message: "Error occured during adding product record"
            })
        })
    })



}

const update = (req, res, next) => {
    let productId = req.params.productId
    let updateData = {
        id: req.body.id,
        name: req.body.name,
        sizes: req.body.sizes,
        material: req.body.material,
        price: req.body.price,
        quantities: req.body.quantities,
        img: req.body.img,
        description: req.body.description
    }

    Product.findByIdAndUpdate(productId, { $set: updateData })
        .then(() => {
            res.json({
                message: "Product data successfully updated"
            })
        })
        .catch(error => {
            res.json({
                message: "Error occured during data update for prodct"
            })
        })
}

const deleteProduct = (req, res, next) => {
    let productId = req.body.productId
    Product.findByIdAndRemove(productId)
        .then(() => {
            res.json({
                message: `Product deleted successfully with id ${productId}`
            })
        })
        .catch(error => {
            res.json({
                message: "Error occured while deleting the employee record"
            })
        })
}

module.exports = {
    index, show, store, update, deleteProduct, allProducts, getProduct
}