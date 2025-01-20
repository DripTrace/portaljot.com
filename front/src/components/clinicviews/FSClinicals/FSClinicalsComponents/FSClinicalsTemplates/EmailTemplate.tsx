interface FSClinicalsEmailTemplateProps {
	fsclinicalsName: string;
}

export const EmailTemplate: React.FC<FSClinicalsEmailTemplateProps> = ({
	fsclinicalsName,
}) => (
	<div className="bg-gray-100 p-6">
		<div className="max-w-600 mx-auto bg-white p-6 rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-4">
				Welcome, {fsclinicalsName}!
			</h1>
			<p className="mb-4">
				Thank you for registering. We&apos;re excited to have you on
				board!
			</p>
			<p className="mb-4">
				As a FSClinicals patient, you now have access to exclusive
				features and benefits. Start exploring our platform and discover
				all the amazing things you can do!
			</p>
			<div className="text-center">
				<a
					href="http://localhost:300/fsclinicals-test/fsclinicals-email"
					className="inline-block bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-600 transition duration-200"
				>
					Get Started with FSClinicals
				</a>
			</div>
		</div>
	</div>
);
