const mutations = `#graphql
    createUser(name:String!,email:String!,password:String!,profileImageUrl:String,username:String!,birthDate:String!): createUserResponse
    login(email:String!,password:String!): LoginResponse
`;

module.exports = { mutations };
