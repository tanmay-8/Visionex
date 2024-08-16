const typeDefs = `#graphql
    type Video{
        id:ID!
        name:String!
        url:String!
        ideaId:ID!
        idea:Idea!
        createdAt:String!
        updatedAt:String!
    }

    input VideoInput{
        name:String!
        ideaId:ID!
    }

  

`;

module.exports = { typeDefs };
