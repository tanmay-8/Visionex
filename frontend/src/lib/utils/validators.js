export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

export const isValidURL = (url) => {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/.*)?$/;
    return regex.test(url);
}
export const isValidIdea = (idea) => {
    if (idea.title.length < 5) {
        return {
            status: false,
            message: "Title should be atleast 5 characters long",
        };
    }
    if (idea.description.length < 20) {
        return {
            status: false,
            message: "Description should be atleast 20 characters long",
        };
    }

    if (idea.category.length === 0) {
        return {
            status: false,
            message: "Please select a category",
        };
    }

    if (idea.tags.length === 0) {
        return {
            status: false,
            message: "Please add atleast one tag",
        };
    }

    if(idea.email && idea.email.length > 0 && !isValidEmail(idea.email)) {
        return {
            status: false,
            message: "Please enter a valid email",
        };
    }
    if (idea.visit && idea.visit.trim().length > 0 && !isValidURL(idea.visit)) {
        return {
            status: false,
            message: "Please enter a valid visit link",
        };
    }

    return {
        status: true,
        message: "",
    };
};
