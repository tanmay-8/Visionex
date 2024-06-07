const typeDefs = `#graphql
    type Image{
        id:ID!
        description:String!
        name:String!
        url:String!
        ideaId:ID!
        idea:Idea!
        createdAt:String!
        updatedAt:String!
    }

    input ImageInput{
        description:String!
        name:String!
        ideaId:ID!
    }
`;

module.exports = { typeDefs };
