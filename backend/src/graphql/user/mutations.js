const mutations = `#graphql
    createUser(name:String!,email:String!,password:String!,profileImageUrl:String,username:String!,birthDate:String!): createUserResponse
    login(email:String!,password:String!): LoginResponse
    updateProfileImage(profileImageUrl:String!): UpdateProfileImageResponse!
    updateProfile(input:UpdateProfileInput): UpdateProfileResponse!
    deleteProfileImage: DeleteProfileImageResponse!
    followUser(username: String!): Response!
    unfollowUser(username: String!): Response!
`;

module.exports = { mutations };
