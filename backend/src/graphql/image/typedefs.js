const typeDefs = `#graphql
    type Image{
        id:ID!
        description:String!
        url:String!
        ideaId:ID!
        idea:Idea!
        createdAt:String!
        updatedAt:String!
    }

    input ImageInput{
        description:String!
        url:String!
        ideaId:ID!
    }
`;

module.exports = { typeDefs };
