import { gql } from "@apollo/client";
export const GET_IDEAS = gql`
    query Query {
        getIdeas {
            id
            title
            description
            images {
                name
                url
            }
            videos {
                name
                url
            }
            category
            tags
            views
            createdAt
            updatedAt
            owner {
                username
                profileImageUrl
            }
            isMine
        }
    }
`;

export const GET_IDEA = gql`
    query GetIdea($ideaId: ID!) {
        getIdea(ideaId: $ideaId) {
            id
            title
            description
            visit
            collaborators
            ownerId
            owner {
                name
                profileImageUrl
                username
            }
            images {
                url
                name
                id
                ideaId
            }
            videos {
                url
                name
                id
                ideaId
            }
            commentsCount
            category
            tags
            views
            upvotesCount
            email
            phone
            linkedin
            twitter
            instagram
            createdAt
            updatedAt
            isMine
        }
    }
`;

export const SEARCH_IDEAS = gql`
    query SearchIdeas($query: String!, $page: Int!, $pageSize: Int!) {
        searchIdeas(query: $query, page: $page, pageSize: $pageSize) {
            ideas {
                id
                title
                description
                images {
                    url
                    name
                }
                videos {
                    url
                    name
                }
                category
                tags
                views
                createdAt
                updatedAt
                owner {
                    username
                    profileImageUrl
                }
                isMine
            }
            pagination {
                currentPage
                totalPages
                totalCount
                hasNextPage
                hasPreviousPage
            }
            success
            error
        }
    }
`;

export const GET_UPVOTES_IDEA = gql`
    query Query($ideaId: ID!) {
        getUpvotesIdea(ideaId: $ideaId) {
            success
            isUpvoted
            upvotesCount
        }
    }
`;

export const GET_COMMENTS_IDEA = gql`
    query Query($ideaId: ID!) {
        getCommentsIdea(ideaId: $ideaId) {
            comments {
                id
                text
                replies {
                    id
                    text
                    userId
                    commentId
                }
                user {
                    username
                    profileImageUrl
                }
                ideaId
                createdAt
                updatedAt
            }
            commentsCount
        }
    }
`;

export const GET_REPLIES_COMMENT = gql`
    query GetRepliesComment($commentId: ID!) {
        getRepliesComment(commentId: $commentId) {
            replies {
                commentId
                createdAt
                id
                text
                updatedAt
                user {
                    profileImageUrl
                    username
                }
            }
        }
    }
`;

export const GET_UPVOTES_COMMENT = gql`
    query GetRepliesComment($commentId: ID!) {
        getUpvotesComment(commentId: $commentId) {
            error
            isUpvoted
            success
            upvotesCount
        }
    }
`;

export const GET_USER_BASIC_INFO = gql`
    query Query {
        getCurrentUser {
            ... on User {
                name
                email
                username
                profileImageUrl
                birthDate
                createdAt
                updatedAt
            }
            ... on Error {
                error
            }
        }
    }
`;

export const GET_USER_PROFILE = gql`
    query GetUserProfile($username: String!) {
        getUserProfile(username: $username) {
            error
            success
            user {
                name
                profileImageUrl
                username
                upvotes {
                    ideaId
                }
                ideas {
                    id
                    title
                    videos {
                        url
                        name
                    }
                    images {
                        name
                        url
                    }
                    views
                    upvotesCount
                    commentsCount
                }
                comments {
                    text
                    ideaId
                }
                followers {
                    username
                    profileImageUrl
                }
                following {
                    username
                    profileImageUrl
                }
                isFollowed
                isFollowing
                isSelf
            }
        }
    }
`;

export const GET_FOLLOWING = gql`
    query GetFollowing($username: String!) {
        getFollowing(username: $username) {
            username
            profileImageUrl
        }
    }
`;

export const GET_FOLLOWERS = gql`
    query GetFollowers($username: String!) {
        getFollowers(username: $username) {
            username
            profileImageUrl
        }
    }
`;
