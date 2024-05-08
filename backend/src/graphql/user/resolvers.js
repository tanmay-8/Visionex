const { userService } = require("../../services/user");

const queries = {
    getCurrentUser: async (_, __, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return {error: "Not authenticated"};
        };

        const res = await userService.getCurrentUser(authToken);
        console.log(res);
        if (res.success) return {...res.user, __typename: "User"};
        else return {error: res.error, __typename: "Error"};
    },
};

const mutations = {
    createUser: async (_, { name, email, password, profileImageUrl,username,birthDate }) => {
        console.log(
            name,
            email,
            password,
            profileImageUrl,
            username,
            birthDate
        )
        const res = await userService.createUser({
            name,
            email,
            password,
            profileImageUrl,
            username,
            birthDate,
        });
        if (res.success) {
            return {...res.user,__typename: "User"};
        }
        else {
            return { error: res.error ,__typename: "Error"};
        };
    },

    login: async (_, { email, password }) => {
        const res = await userService.login(email, password );
        console.log(res);
        if (res.success) return { token: res.token.token, __typename: "LoginOk"};
        else return { error: res.error ,__typename: "Error"};
    },
};

const resolvers = {
    queries,
    mutations,
};
module.exports = { resolvers };
