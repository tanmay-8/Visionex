const isValidName = (name) => {
    if(!name || name.length < 3) {
        return {is: false, message: "Name must be at least 3 characters long"};
    };
    return {is: true, message: ""};
};

const isValidEmail = (email) => {
    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if(!email || !emailRegex.test(email)) {
        return {is: false, message: "Invalid email"};
    };
    return {is: true, message: ""};
}

const isValidPassword = (password) => {
    if(!password || password.length < 6) {
        return {is: false, message: "Password must be at least 6 characters long"};
    };
    return {is: true, message: ""};
}

module.exports = {
    isValidName,
    isValidEmail,
    isValidPassword
};