const queries = `#graphql
    getIdeas: [Idea]
    getUpvotesIdea(ideaId:ID!):GetUpvotesIdeaResponse!
    getCommentsIdea(ideaId:ID!):GetCommentsIdeaResponse!
    getRepliesComment(commentId:ID!):GetRepliesCommentResponse!
    getUpvotesComment(commentId:ID!):GetUpvotesCommentResponse!
`;

module.exports = { queries };
