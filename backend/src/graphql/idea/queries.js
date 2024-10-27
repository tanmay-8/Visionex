const queries = `#graphql
    getIdeas(query:String,page:Int!,pageSize:Int!): IdeasResponse!
    getIdea(ideaId:ID!):Idea!
    getUpvotesIdea(ideaId:ID!):GetUpvotesIdeaResponse!
    getCommentsIdea(ideaId:ID!):GetCommentsResponse!
    getRepliesComment(commentId:ID!):GetRepliesCommentResponse!
    getUpvotesComment(commentId:ID!):GetUpvotesCommentResponse!
    getCommentsUser(userId:ID!):GetCommentsResponse!
`;

module.exports = { queries };
