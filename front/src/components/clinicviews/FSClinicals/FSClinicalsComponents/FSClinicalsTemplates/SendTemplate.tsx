interface FSClinicalsSendTemplateProps {
	fsclinicalsFullname: string;
	fsclinicalsEmail: string;
	fsclinicalsMessage: string;
}

export const FSClinicalsSendTemplate: React.FC<
	FSClinicalsSendTemplateProps
> = ({ fsclinicalsFullname, fsclinicalsEmail, fsclinicalsMessage }) => (
	<div>
		<div
			className="container"
			style={{ marginLeft: "20px", marginRight: "20px" }}
		>
			<h3>
				You&apos;ve got new mail from {fsclinicalsFullname}, their
				fsclinicalsEmail is: ✉️
				{fsclinicalsEmail}{" "}
			</h3>
			<div style={{ fontSize: "16px" }}>
				<p>fsclinicalsMessage:</p>
				<p>{fsclinicalsMessage}</p>
				<br />
			</div>
			<p
				className="footer"
				style={{
					fontSize: "16px",
					paddingBottom: "20px",
					borderBottom: "1px solid #D1D5DB",
				}}
			>
				Regards
				<br />
				FSClinicals
				<br />
				Psychiatric
				<br />
				Connect
			</p>
			<div
				className="footer-links"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<a
					href="https://github.com/RussPalms/"
					style={{
						textDecoration: "none",
						margin: "8px",
						color: "#9CA3AF",
					}}
				>
					GitHub
				</a>
				<a
					href="https://instagram.com/rpalmpinoy/"
					style={{
						textDecoration: "none",
						margin: "8px",
						color: "#9CA3AF",
					}}
				>
					Instagram
				</a>
				<a
					href="https://linkedin.com/in/russell-palma-6b9700b9/"
					style={{
						textDecoration: "none",
						margin: "8px",
						color: "#9CA3AF",
					}}
				>
					LinkedIn
				</a>
				<a
					href="https://twitter.com/rPalmPinoy/"
					style={{
						textDecoration: "none",
						margin: "8px",
						color: "#9CA3AF",
					}}
				>
					Twitter
				</a>
			</div>
		</div>
	</div>
);
