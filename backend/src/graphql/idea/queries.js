const queries = `#graphql
    getIdeas: [Idea]
    getIdea(ideaId:ID!):Idea!
    getUpvotesIdea(ideaId:ID!):GetUpvotesIdeaResponse!
    getCommentsIdea(ideaId:ID!):GetCommentsResponse!
    getRepliesComment(commentId:ID!):GetRepliesCommentResponse!
    getUpvotesComment(commentId:ID!):GetUpvotesCommentResponse!
    getCommentsUser(userId:ID!):GetCommentsResponse!
`;

module.exports = { queries };
