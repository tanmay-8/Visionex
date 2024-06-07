const {isValidEmail} = require("./userValidators")

const ideaValidator = (input)=>{
    const {
        title,
        description,
        category,
        email,
    } = input;

    const errors = [];
    if(!title){
        errors.push("Title is required");
    }else{
        if(title.length < 5){
            errors.push("Title must be at least 5 characters");
        }
    }

    if(!description){
        errors.push("Description is required");
    }else{
        if(description.length < 10){
            errors.push("Description must be at least 10 characters");
        }
    }

    if(!category){
        errors.push("Category is required");
    }

    if(email && !isValidEmail(email)){
        errors.push("Email is invalid");
    }

    if(errors.length > 0){
        return {success:false,errors};
    }

    return {success:true};
}

module.exports = {ideaValidator};