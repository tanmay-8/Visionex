const typeDefs = `#graphql
    type Video{
        id:ID!
        description:String!
        url:String!
        ideaId:ID!
        idea:Idea!
        createdAt:String!
        updatedAt:String!
    }

    input VideoInput{
        description:String!
        url:String!
        ideaId:ID!
    }
`;

module.exports = { typeDefs };
