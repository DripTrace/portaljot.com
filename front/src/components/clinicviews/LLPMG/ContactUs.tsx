const ContactUs = () => {
	return (
		<div className="mb-4 aspect-w-16 aspect-h-9 size-full flex items-center justify-center rounded-md">
			<iframe
				src={"https://lomalindapsych.com/contact"}
				width="100%"
				height="100%"
				style={{ border: 0 }}
				allowFullScreen={false}
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				title={`llpmg-contact-us`}
				className="rounded-md size-full"
			></iframe>
		</div>
	);
};

export default ContactUs;
