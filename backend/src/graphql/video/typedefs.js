const typeDefs = `#graphql
    type Video{
        id:ID!
        description:String!
        name:String!
        url:String!
        ideaId:ID!
        idea:Idea!
        createdAt:String!
        updatedAt:String!
    }

    input VideoInput{
        description:String!
        name:String!
        ideaId:ID!
    }

  

`;

module.exports = { typeDefs };
