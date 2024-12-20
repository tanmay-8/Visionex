import { gql } from "@apollo/client";

// User Mutations
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

export const UPDATE_PROFILE_IMAGE = gql`
    mutation UpdateProfileImage($profileImageUrl: String!) {
        updateProfileImage(profileImageUrl: $profileImageUrl) {
            error
            url
            success
        }
    }
`;

export const UPDATE_PROFILE = gql`
    mutation UpdateProfile($input: UpdateProfileInput) {
        updateProfile(input: $input) {
            error
            success
            data {
                name
                email
                username
                birthDate
            }
        }
    }
`;

export const DELETE_PROFILE_IMAGE = gql`
    mutation DeleteProfileImage {
        deleteProfileImage {
            error
            success
        }
    }
`;

export const FOLLOW_USER = gql`
    mutation FollowUser($username: String!) {
        followUser(username: $username) {
            success
            error
        }
    }
`;

export const UNFOLLOW_USER = gql`
    mutation UnfollowUser($username: String!) {
        unfollowUser(username: $username) {
            success
            error
        }
    }
`;

// Idea Mutations
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

export const UPVOTE_IDEA = gql`
    mutation Upvote($upvoteInput: UpvoteInput!) {
        upvote(upvoteInput: $upvoteInput) {
            success
            message
            error
        }
    }
`;

export const SAVE_IDEA = gql`
    mutation SaveIdea($ideaId: ID!) {
        saveIdea(ideaId: $ideaId) {
            success
            error
        }
    }
`;

export const CREATE_COMMENT = gql`
    mutation Mutation($commentInput: CommentInput!) {
        createComment(commentInput: $commentInput) {
            message
            success
            error
        }
    }
`;

export const UPVOTE_COMMENT = gql`
    mutation Mutation($commentUpvoteInput: CommentUpvoteInput!) {
        upvoteComment(commentUpvoteInput: $commentUpvoteInput) {
            error
            message
            success
        }
    }
`;
