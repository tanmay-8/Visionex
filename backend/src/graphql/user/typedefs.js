const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
        username: String!
        profileImageUrl: String
        comments: [Comment!]
        ideas: [Idea!]
        upvotes: [Upvote!]
        birthDate: String!
        createdAt: String!
        updatedAt: String!
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
    
  
`;

module.exports = { typeDefs };
