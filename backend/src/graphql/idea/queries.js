const queries = `#graphql
    getIdeas: [Idea]
    getUpvotesIdea(ideaId:ID!):GetUpvotesIdeaResponse!
    getCommentsIdea(ideaId:ID!):GetCommentsIdeaResponse!
`;

module.exports = { queries };
