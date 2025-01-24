"use client";

import client from "@/config/commune/apolloClient";
import { ApolloProvider } from "@apollo/client";

const ApolloProviderWrapper = ({ children }: { children: React.ReactNode }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
