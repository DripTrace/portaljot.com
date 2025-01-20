export function html({ url, host, email }: any) {
    const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
    const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;
    return `
		<body>
		  <h1>Your magic link! 🪄</h1>
		  <h3>Your email is ${escapedEmail}</h3>
		  <p>
			<a href="${url}">Sign in to ${escapedHost}</a>
		</body>
	`;
}

export function text({ url, host }: any) {
    return `Sign in to ${host}\n${url}\n\n`;
}
