const mutations = `#graphql
    createIdea(
        ideaInput:IdeaInput!
    ):CreateIdeaResponse

    upvote(
        upvoteInput:UpvoteInput!
    ):Response!

    createComment(
        commentInput:CommentInput!
    ):Response!
`;

module.exports = { mutations };
