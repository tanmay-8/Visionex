import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ... on LoginOk {
                token
            }
            ... on Error {
                error
            }
        }
    }
`;

export const REGISTER_USER = gql`
    mutation Mutation(
        $name: String!
        $email: String!
        $password: String!
        $username: String!
        $birthDate: String!
    ) {
        createUser(
            name: $name
            email: $email
            password: $password
            username: $username
            birthDate: $birthDate
        ) {
            ... on User {
                name
                email
                username
                birthDate
            }
            ... on Error {
                error
            }
        }
    }
`;

export const CREATE_IDEA = gql`
    mutation CreateIdea(
        $title: String!
        $description: String!
        $visit: String
        $category: String!
        $tags: [String!]
        $collaborators: [String!]
        $images: [String!]
        $videos: [String!]
        $email: String
        $linkedin: String
        $twitter: String
        $instagram: String
    ) {
        createIdea(
            ideaInput: {
                title: $title
                description: $description
                visit: $visit
                category: $category
                tags: $tags
                collaborators: $collaborators
                images: $images
                videos: $videos
                email: $email
                linkedin: $linkedin
                twitter: $twitter
                instagram: $instagram
            }
        ) {
            success
            error
        }
    }
`;
