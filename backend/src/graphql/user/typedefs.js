const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
        username: String
        profileImageUrl: String
        comments: [Comment!]
        ideas: [Idea!]
        upvotes: [Upvote!]
        birthDate: String!
        createdAt: String!
        updatedAt: String!
        followers: [User!]
        following: [User!]
        isFollowed: Boolean!
        isFollowing: Boolean!
        isSelf: Boolean!
    }

    input UpdateProfileInput {
        username: String
        name: String
        birthDate: String
    }

    type GetUserProfileResponse{
        user:User
        success: Boolean!
        error:String
    }

    type LoginOk {
        token: String
    }

    type Error {
        error: String
    }
    union GetUserResponse = User | Error
    union LoginResponse = LoginOk | Error
    union createUserResponse = User | Error
    

    type UpdateProfileImageResponse{
        success:Boolean!
        error:String
        url:String
    }

    type UpdateProfileResponse{
        success:Boolean!
        error:String
        data:User
    }

    type DeleteProfileImageResponse{
        success:Boolean!
        error:String
    }
`;

module.exports = { typeDefs };
