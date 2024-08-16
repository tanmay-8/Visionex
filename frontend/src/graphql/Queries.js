import { gql } from "@apollo/client";
export const GET_IDEAS = gql`
    query Query {
        getIdeas {
            id
            title
            description
            visit
            collaborators
            ownerId
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
            upvotesCount
            email
            phone
            linkedin
            twitter
            instagram
            createdAt
            updatedAt
            comments {
                id
                text
                userId
            }
            owner {
                username
                profileImageUrl
            }
            upvotes {
                userId
            }
            isMine
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
                    title
                    videos {
                        url
                        name
                    }
                    images{
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
            }
        }
    }
`;
