// "use client";

// import {
// 	ApolloClient,
// 	DefaultOptions,
// 	InMemoryCache,
// 	createHttpLink,
// } from "@apollo/client";

// export const BASE_URL =
// 	process.env.NODE_ENV !== "development"
// 		? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
// 		: `${process.env.NEXT_PUBLIC_URL}`;

// console.log(
// 	"CLIENT >>> NEXT_PUBLIC_VERCEL_URL is ",
// 	process.env.NEXT_PUBLIC_VERCEL_URL
// );
// console.log("CLIENT DEBUG 1 >>> GraphQL URL is ", `${BASE_URL}/api/graphql`);
// const httpLink = createHttpLink({
// 	uri: `${BASE_URL}/api/graphql`, // Point to the new API route
// });

// const defaultOptions: DefaultOptions = {
// 	watchQuery: {
// 		fetchPolicy: "no-cache",
// 		errorPolicy: "all",
// 	},
// 	query: {
// 		fetchPolicy: "no-cache",
// 		errorPolicy: "all",
// 	},
// 	mutate: {
// 		fetchPolicy: "no-cache",
// 		errorPolicy: "all",
// 	},
// };
// const client = new ApolloClient({
// 	link: httpLink,
// 	cache: new InMemoryCache(),
// 	defaultOptions,
// });

// export default client;

"use client";

import {
	ApolloClient,
	DefaultOptions,
	InMemoryCache,
	createHttpLink,
	from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

export const BASE_URL =
	process.env.NODE_ENV !== "development"
		? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
		: `${process.env.NEXT_PUBLIC_URL}`;

console.log(
	"CLIENT >>> NEXT_PUBLIC_VERCEL_URL is ",
	process.env.NEXT_PUBLIC_VERCEL_URL
);
console.log(
	"CLIENT DEBUG 1 >>> GraphQL URL is ",
	`${BASE_URL}/api/commune/graphql`
);

const httpLink = createHttpLink({
	uri: `${BASE_URL}/api/commune/graphql`,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

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

const client = new ApolloClient({
	link: from([errorLink, httpLink]),
	cache: new InMemoryCache(),
	defaultOptions,
});

export default client;
