const mutations = `#graphql
    createIdea(
        ideaInput:IdeaInput!
    ):CreateIdeaResponse
    saveIdea(ideaId:ID!):Response!
    upvote(
        upvoteInput:UpvoteInput!
    ):Response!

    createComment(
        commentInput:CommentInput!
    ):Response!

    upvoteComment(
        commentUpvoteInput:CommentUpvoteInput!
    ):Response!
`;

module.exports = { mutations };
