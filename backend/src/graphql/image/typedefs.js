const typeDefs = `#graphql
    type Image{
        id:ID!
        name:String!
        url:String!
        ideaId:ID!
        idea:Idea!
        createdAt:String!
        updatedAt:String!
    }

    input ImageInput{
        name:String!
        ideaId:ID!
    }

    type getUrlResponse{
        url:String!
        success:Boolean!
        error:String
    }
`;

module.exports = { typeDefs };
