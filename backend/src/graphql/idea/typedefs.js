const typeDefs = `#graphql
    type Upvote{
        id:ID!
        userId:ID!
        ideaId:ID!
        user:User!  
        createdAt:String!
        updatedAt:String!
    }
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
        commentsCount:Int!
        category:String!
        tags:[String]
        views:Int!
        upvotesCount:Int!
        upvotes:[Upvote!]
        email:String
        phone:String
        linkedin:String
        twitter:String
        instagram:String
        createdAt:String!
        updatedAt:String!
        isMine:Boolean!
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
