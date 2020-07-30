const express = require('express');
const ShopData = require('./src/model/Shopdata');
const User = require('./src/model/user');
const cors = require('cors');
var bodyparser = require('body-parser');
const jwt = require("jsonwebtoken");
var app = new express();
app.use(cors());
app.use(bodyparser.json());


function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request -1');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized Request -2');
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized Request-3');
    }
    req.userId = payload.subject;
    next();
}

app.get('/shops', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS");
    ShopData.find()
        .then(function(shops) {
            res.send(shops);
        });
});

app.get('/myshop/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS");
    const id = req.params.id;
    ShopData.find({ ownerId: id })
        .then(function(shop) {
            res.send(shop);
        });
});

app.post('/insert', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);
    var shop = {
        shopId: req.body.shop.shopId,
        shopNo: req.body.shop.shopNo,
        shopName: req.body.shop.shopName,
        shopCategory: req.body.shop.shopCategory,
        shopLocation: req.body.shop.shopLocation,
        contactNo: req.body.shop.contactNo,
        starRating: req.body.shop.starRating,
        imageUrl: req.body.shop.imageUrl
    }
    var shop = new ShopData(shop);
    shop.save();
});

app.get('/edit/:id', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    ShopData.findOne({ _id: id })
        .then(function(shop) {
            res.send(shop);
        });
});
app.post('/update', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log("reqbody" + req.body);
    var shop = {
        _id: req.body.shop._id,
        shopNo: req.body.shop.shopNo,
        shopName: req.body.shop.shopName,
        shopCategory: req.body.shop.shopCategory,
        shopLocation: req.body.shop.shopLocation,
        contactNo: req.body.shop.contactNo,
        starRating: req.body.shop.starRating,
        imageUrl: req.body.shop.imageUrl
        
    }
    ShopData.findOne({ _id: shop._id })
        .then(function(shopret) {
            if (!shopret) {
                return next(new Error('Could not load Document'));
            }
            else {
                var shopupdate = new ShopData(shop);
                console.log("findOne" + shopret)
                // productupdate.save();
                console.log("findOne update" + shopupdate)
                ShopData.findByIdAndUpdate(shopupdate._id, shopupdate, (er, updated) => {
                    console.log(updated);
                });
            }
        });
});

app.get('/delete/:id',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    ShopData.findOneAndDelete({ _id: id })
    .then(function(){
        ShopData.find()
        .then(function(shops){
           res.send(shops);
        });
        // console.log("deleted"+deleted);
    });
});

// register api
app.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((err,registeredUser)=>{
        if(err){
            console.log(err)
        } else{
            let payload = {subject: user._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
            // res.status(200).send(registeredUser)
        }
    });
    })

    // login api
app.post('/login',(req,res)=>{
    let userData = req.body
    User.findOne({email:userData.email}, (err,user)=>{
        if(err){
            console.log(err)
        } else {
                if(!user){
                    res.status(401).send('Invalid Email')
                } else
                if(user.password !==userData.password){
                    res.status(401).send('Invalid Password')
                }
                else{
                    let payload = {subject: user._id}
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token,payload})
                    // res.status(200).send(user)
                }
            }
        })
    })

app.post('/filtershops' , function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let filterData = req.body;
    console.log(filterData);
    ShopData.find({ $and: [{shopLocation:filterData.location_type}, {shopCategory:filterData.category_type}] },(err,filtershops) =>{
        if(err)
        {
            
            console.log(err);
        }
        else
        {
            
            console.log(filtershops);
            if(!filtershops)
            {
                res.status(401).send("ntg to show");
            }
            else
            {
                res.send(filtershops);
            }
        }
    });







})    
    
app.listen(3000, function() {
    console.log('listening to port 3000');
});    