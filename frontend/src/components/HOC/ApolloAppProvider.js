"use client";
import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

const ApolloAppProvider = ({ children }) => {
    const client = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
        cache: new InMemoryCache(),
    });
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloAppProvider;
