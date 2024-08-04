const queries = `#graphql
getCurrentUser: GetUserResponse
getUserProfile(username: String!): GetUserProfileResponse!
`;

module.exports = { queries };
