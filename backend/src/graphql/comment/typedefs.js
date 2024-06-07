const typeDefs = `#graphql
    type Comment{
        id:ID!
        text:String!
        ideaId:ID!
        userId:ID!
        createdAt:String!
        updatedAt:String!
    }

    input CommentInput{
        text:String!
        ideaId:ID!
        userId:ID!
    }
`;

module.exports = { typeDefs };
