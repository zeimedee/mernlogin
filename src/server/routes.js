const express = require('express');
const routes = express.Router();
const validateUser = require('./validator/validateUser');

let User = require('./user.model');


//routes
routes.route('/').get((req, res)=>{
    User.find((err, user) => {
        if(err){
            console.log(err);
        }else{
            res.json(user);
        }
    });
});

routes.route('/add').post((req, res)=>{

        const{errors, isValid} = validateUser(req.body);

       if(!isValid){
            return res.status(400).json(errors);
        }

        User.findOne({email: req.body.email})
            .then(user => {
                if(user){
                    return res.status(400).json({email:"Email already exists"});
                } else{
                    let user = new User(req.body);
                    user.save()
                        .then(() => {
                            res.status(200).json({'user':'user added successfully'});
                        })
                        .catch(() => {
                            req.status(400).send('user failed to add');
                        });
                }
            })

    
});

routes.route('/:id').get((req,res)=>{
    let id = req.params.id;
    User.findById(id, (user)=> { res.json(user);})
        .catch(err => console.log(err))
});

module.exports = routes;