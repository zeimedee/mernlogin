const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateUser = require('./validator/validateUser');
const validateLogin = require('./validator/validateLogin');
const key ="secret";
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

                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(user.password, salt, (err, hash)=>{
                            if (err) throw err;
                            user.password = hash;
                            user.save()
                                .then(() => {
                                    res.status(200).json({'user':'user added successfully'});
                                })
                                .catch(() => {
                                    req.status(400).send('user failed to add');
                                });
                        });
                    });  
                }
            });
        });

routes.route('/login').post((req,res)=>{
    const{errors, isValid} = validateLogin(req.body);

    if(!isValid){
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(400).json({Email:"Email not found"});
            }
            
            bcrypt.compare(password, user.password)
                  .then(isMatch =>{ 
                      if(isMatch){
                          //create payload
                          const payload ={
                              id:user.id,
                              name: user.name
                          };
                          //sign token
                          jwt.sign(
                              payload,
                              key,
                              {
                                  expiresIn: 31556926
                              },
                              (err, token)=>{
                                    res.json({
                                        success: true,
                                        token: "Bearer" + token
                                    });
                              }
                          );
                      }else {
                          return res.status(400).json({passwordincorrect: "Password incorrect"});
                      }
                  });

        });
});

routes.route('/:id').get((req,res)=>{
    let id = req.params.id;
    User.findById(id, (user)=> { res.json(user);})
        .catch(err => console.log(err))
});

module.exports = routes;