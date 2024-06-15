const { ApolloServer } = require("@apollo/server");
const User = require("./user/index");
const Idea = require("./idea/index");
const Image = require("./image/index");
const Video = require("./video/index");
const Comment = require("./comment/index");

const createGraphqlServer = async () => {
    const server = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}
            ${Idea.typeDefs}
            ${Image.typeDefs}
            ${Video.typeDefs}
            ${Comment.typeDefs}
            type Query {
                ${User.queries}
                ${Idea.queries}
                ${Image.queries}
                ${Video.queries}
            }
            type Mutation {
                ${User.mutations}
                ${Idea.mutations}
                ${Image.mutations}
                ${Video.mutations}

            }
            `,

        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...Idea.resolvers.queries,
                ...Image.resolvers.queries,
                ...Video.resolvers.queries,
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Idea.resolvers.mutations,
                ...Image.resolvers.mutations,
                ...Video.resolvers.mutations,
            },
        },
    });

    await server.start();

    return server;
};

module.exports = createGraphqlServer;
