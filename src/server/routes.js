const express = require('express');
const routes = express.Router();

let User = require('./user.model');


//routes
routes.route('/').get((req, res)=>{
    User.find((err, movie) => {
        if(err){
            console.log(err);
        }else{
            res.json(movie);
        }
    });
});

routes.route('/add').post((req, res)=>{
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user':'user added successfully'});
        })
        .catch(err => {
            req.status(400).send('user failed to add');
        });
});


module.exports = routes;