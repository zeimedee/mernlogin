const validator = require('validator');
const isEmpty = require('is-empty');

const  validateUser = (data) => {

    let errors= {};

    //convert empty fields to empty strings
    data.name = !isEmpty(data.name)? data.name : "";
    data.email = !isEmpty(data.email)? data.email: "";
    data.password = !isEmpty(data.password)? data.password: "";

    //name checks
    if(validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    }

    //email checks
    if(validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    } else if(!validator.isEmail(data.email)){
        errors.email="Email is invalid";
    }

    //password checks
    if(validator.isEmpty(data.password)){
        errors.password = "Password field is required"
    }

    if(!validator.isLength(data.password, {min:6, max: 12})){
        errors.password = "Password must be at least 6 letters";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };

};
module.exports = validateUser;