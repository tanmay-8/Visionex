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
    mutation CreateIdea {
        createIdea(
            title:String!
            description:String!
            visit:String
            collaborators:[String!]
            category:String!
            tags:[String!]
            email:String
            phone:String
            linkedin:String
            twitter:String
            instagram:String

        )(
            ideaInput: {
                title: $title
                description: $description
                visit: $visit
                collaborators: $collaborators
                category: $category
                tags: $tags
                email: $email
                phone: $phone
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
