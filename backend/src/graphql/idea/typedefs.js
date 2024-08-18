const typeDefs = `#graphql
    type Upvote{
        id:ID!
        userId:ID!
        ideaId:ID!
        user:User!  
        createdAt:String!
        updatedAt:String!
    }
    input UpvoteInput{
        ideaId:ID!
    }
    type Comment{
        id:ID!
        commentId:ID
        text:String!
        userId:ID!
        ideaId:ID!
        user:User!
        idea:Idea!
        createdAt:String!
        updatedAt:String!
        replies:[Comment!]  
    }

    input CommentInput{
        text:String!
        ideaId:ID!
        commentId:ID
    }
    type CommentUpvote{
        id:ID!
        userId:ID!
        commentId:ID!
        user:User!
        comment:Comment!
        createdAt:String!
        updatedAt:String!
    }
    input CommentUpvoteInput{
        commentId:ID!
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
        commentUpvotes:[CommentUpvote!]
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

    type GetUpvotesIdeaResponse{
        isUpvoted:Boolean!
        upvotesCount:Int!
        success:Boolean
        error:String
    }

    type GetCommentsIdeaResponse{
        comments:[Comment!]
        commentsCount:Int!
        success:Boolean
        error:String
    }

    type Response{
        success:Boolean
        error:String
        message:String  
    }
   
`;

module.exports = { typeDefs };
