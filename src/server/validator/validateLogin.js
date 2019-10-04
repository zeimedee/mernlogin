const validator = require('validator');
const isEmpty = require('is-empty');

const validateLogin = (data) =>{
    let errors = {};

    data.email = !isEmpty(data.email)? data.email: "";
    data.password = !isEmpty(data.password)? data.password: "";

    //email
    if(validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }else if(!validator.isEmail(data.email)){
        errors.email= "Email is invalid";
    }

    //password
    if(validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }

};

module.exports = validateLogin;