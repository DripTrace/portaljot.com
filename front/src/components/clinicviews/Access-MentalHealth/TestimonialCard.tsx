interface TestimonialCardProps {
	quote: string;
	name: string;
	title: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
	quote,
	name,
	title,
}) => {
	return (
		<div className="p-6 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 rounded-lg shadow-md">
			<p className="text-gray-700 dark:text-gray-300 italic">
				&quot;{quote}&quot;
			</p>
			<div className="mt-4">
				<h4 className="text-lg font-semibold text-gray-900 dark:text-white">
					{name}
				</h4>
				<p className="text-gray-600 dark:text-gray-400">{title}</p>
			</div>
		</div>
	);
};

export default TestimonialCard;
