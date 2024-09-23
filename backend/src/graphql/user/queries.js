const queries = `#graphql
getCurrentUser: GetUserResponse
getUserProfile(username: String!): GetUserProfileResponse!
getFollowing(username: String!): [User]
getFollowers(username: String!): [User]
`;

module.exports = { queries };
