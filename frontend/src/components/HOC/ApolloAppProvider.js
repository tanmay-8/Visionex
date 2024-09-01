"use client";
import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import { useAppSelector } from "@/lib/redux/hooks";

const ApolloAppProvider = ({ children }) => {
    const token = useAppSelector((state) => state.user.authToken);
    const client = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
        headers: {
            authToken: token || "",
        },
        cache: new InMemoryCache(),
    });
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloAppProvider;
