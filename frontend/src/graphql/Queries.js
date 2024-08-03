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
                name
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