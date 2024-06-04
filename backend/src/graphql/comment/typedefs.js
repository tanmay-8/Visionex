const typeDefs = `#graphql
    type Comment{
        id:ID!
        text:String!
        ideaId:ID!
        idea:Idea!
        userId:ID!
        user:User!
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
