const typeDefs = `#graphql
    type Idea{
        id:ID!
        title:String!
        description:String!
        visit:String
        collaborators:[String]
        ownerId:ID!
        owner:User!
        images:[Image!]
        videos:[Video!]
        comments:[Comment!]
        category:String!
        tags:[String]
        views:Int!
        upvotes:Int!
        email:String
        phone:String
        linkedin:String
        twitter:String
        instagram:String
        createdAt:String!
        updatedAt:String!
    }

    input IdeaInput{
        title:String!
        description:String!
        visit:String
        images:[String!]
        videos:[String!]
        collaborators:[String!]
        category:String!
        tags:[String!]
        email:String
        linkedin:String
        twitter:String
        instagram:String
    }

    type CreateIdeaResponse{
        idea:Idea
        success:Boolean
        error:String
    }
   
`;

module.exports = { typeDefs };
