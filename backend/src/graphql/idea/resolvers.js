const { ideaService } = require("../../services/idea");

const queries = {
    getIdeas: async (_, __, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated" };
        }

        const res = await ideaService.getIdeas(authToken);
        console.log(res.ideas);
        if (res.success) return res.ideas;
        else return { error: res.error };
    },
    getUpvotesIdea: async (_, { ideaId }, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated" };
        }

        const res = await ideaService.getUpvotesIdea(ideaId, authToken);
        if (res.success)
            return {
                isUpvoted: res.isUpvoted,
                upvotesCount: res.upvotesCount,
                success: true,
            };
        else return { error: res.error };
    },
    getCommentsIdea: async (_, { ideaId }, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated" };
        }

        const res = await ideaService.getCommentsIdea(ideaId, authToken);
        if (res.success)
            return {
                comments: res.comments,
                commentsCount: res.commentsCount,
                success: true,
            };
        else return { error: res.error };
    },
};

const mutations = {
    createIdea: async (_, { ideaInput }, context) => {
        const authToken = context.req.req.headers.authtoken;
        console.log(context.req.req.headers);
        if (!authToken) {
            return { error: "Not authenticated" };
        }
        const res = await ideaService.createIdea(ideaInput, authToken);

        if (res.success) {
            return {
                idea: res.idea,
                success: true,
            };
        } else {
            return {
                error: res.error,
                success: false,
            };
        }
    },

    upvote: async (_, { upvoteInput }, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated" };
        }
        const res = await ideaService.upvote(upvoteInput, authToken);

        if (res.success) {
            return {
                success: true,
                message: res.message,
            };
        } else {
            return {
                error: res.error,
                success: false,
            };
        }
    },

    createComment: async (_, { commentInput }, context) => {
        const authToken = context.req.req.headers.authtoken;
        if (!authToken) {
            return { error: "Not authenticated" };
        }
        const res = await ideaService.createComment(commentInput, authToken);

        if (res.success) {
            return {
                success: true,
                message: "Comment created",
            };
        } else {
            return {
                error: res.error,
                success: false,
            };
        }
    },
};

const resolvers = {
    queries,
    mutations,
};
module.exports = { resolvers };
