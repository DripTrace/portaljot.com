export const Footer = () => {
	return (
		<footer className="text-center py-8  bg-cover footer">
			<p>
				Developed by{" "}
				<a
					href="https://russpalms.github.io"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:underline"
				>
					Russell Palma
				</a>{" "}
				@{new Date().getFullYear()}
				<a
					href="https://russpalms.github.io"
					target="_blank"
					rel="noopener noreferrer"
					className="ml-2 text-[hsla(231,71%,59%,1)] hover:underline"
				>
					GitHub
				</a>
			</p>
		</footer>
	);
};
