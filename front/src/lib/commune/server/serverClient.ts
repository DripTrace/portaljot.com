import {
	ApolloClient,
	DefaultOptions,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import { graphql } from "graphql";

const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
const graphqlToken = process.env.GRAPHQL_TOKEN;
console.log("GRAPHQL ENDPOINT >>>", graphqlEndpoint);
console.log("GRAPHQL TOKEN >>>", graphql);

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	},
	query: {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	},
	mutate: {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	},
};

export const serverClient = new ApolloClient({
	ssrMode: true,
	link: new HttpLink({
		uri: graphqlEndpoint, // Replace with your GraphQL endpoint
		headers: {
			Authorization: `apikey ${graphqlToken}`,
		},
		fetch,
	}),
	cache: new InMemoryCache(),
	defaultOptions,
});
