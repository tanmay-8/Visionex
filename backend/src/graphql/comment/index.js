const {resolvers} = require('./resolvers');
const { queries } = require('./queries');
const { mutations } = require('./mutations');
const {typeDefs} = require('./typedefs')

const Comment = {
    typeDefs,
    resolvers,
    queries,
    mutations,
}

module.exports = Comment;