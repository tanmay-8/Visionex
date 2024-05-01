const {resolvers} = require('./resolvers');
const { queries } = require('./queries');
const { mutations } = require('./mutations');
const {typeDefs} = require('./typedefs')

const User = {
    typeDefs,
    resolvers,
    queries,
    mutations,
}

module.exports =  User ;