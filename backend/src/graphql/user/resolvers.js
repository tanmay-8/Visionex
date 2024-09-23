const { userService } = require("../../services/user");

const queries = {
    getCurrentUser: async (_, __, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated" };
        }

        const res = await userService.getCurrentUser(authToken);
        console.log(res);
        if (res.success) return { ...res.user, __typename: "User" };
        else return { error: res.error, __typename: "Error" };
    },

    getUserProfile: async (_, { username }, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated" };
        }
        const res = await userService.getUserProfile(username, authToken);
        if (res.success) {
            return {
                user: res.user,
                success: true,
            };
        } else {
            return { error: res.error, success: false };
        }
    },

    getFollowing: async (_, { username }, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated", success: false };
        }
        const res = await userService.getFollowing(authToken, username);
        console.log(res);
        if (res.success) return res.following;
        else return [];
    },
    getFollowers: async (_, { username }, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated", success: false };
        }
        const res = await userService.getFollowers(authToken, username);
        console.log(res);   
        if (res.success) return res.followers;
        else return [];
    },
};

const mutations = {
    createUser: async (
        _,
        { name, email, password, profileImageUrl, username, birthDate }
    ) => {
        console.log(
            name,
            email,
            password,
            profileImageUrl,
            username,
            birthDate
        );
        const res = await userService.createUser({
            name,
            email,
            password,
            profileImageUrl,
            username,
            birthDate,
        });
        if (res.success) {
            return { ...res.user, __typename: "User" };
        } else {
            return { error: res.error, __typename: "Error" };
        }
    },

    login: async (_, { email, password }) => {
        const res = await userService.login(email, password);
        console.log(res);
        if (res.success)
            return { token: res.token.token, __typename: "LoginOk" };
        else return { error: res.error, __typename: "Error" };
    },

    updateProfileImage: async (_, { profileImageUrl }, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated", success: false };
        }

        const res = await userService.updateProfileImage(
            profileImageUrl,
            authToken
        );
        if (res.success) return { success: true, url: res.url.url };
        else return { error: res.error, success: false };
    },
    updateProfile: async (_, { input }, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated", success: false };
        }
        const res = await userService.updateProfile(input, authToken);
        if (res.success) return { success: true, data: res.user };
        else return { error: res.error, success: false };
    },
    deleteProfileImage: async (_, __, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated", success: false };
        }
        const res = await userService.deleteProfileImage(authToken);
        if (res.success) return { success: true };
        else return { error: res.error, success: false };
    },
    followUser: async (_, { username }, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated", success: false };
        }
        const res = await userService.followUser(authToken, username);
        if (res.success) return { success: true };
        else return { error: res.error, success: false };
    },
    unfollowUser: async (_, { username }, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated", success: false };
        }
        const res = await userService.unfollowUser(authToken, username);
        if (res.success) return { success: true };
        else return { error: res.error, success: false };
    },
};

const resolvers = {
    queries,
    mutations,
};
module.exports = { resolvers };
