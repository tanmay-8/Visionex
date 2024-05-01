const { ApolloServer } = require("@apollo/server");
const User = require("./user/index");
const Idea = require("./idea/index");

const createGraphqlServer = async () => {
    const server = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}
            ${Idea.typeDefs}
            type Query {
                ${User.queries}
                ${Idea.queries}
            }
            type Mutation {
                ${User.mutations}
                ${Idea.mutations}
            }
            `,

        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...Idea.resolvers.queries,
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Idea.resolvers.mutations,
            },
        },
    });

    await server.start();

    return server;
};

module.exports = createGraphqlServer;
