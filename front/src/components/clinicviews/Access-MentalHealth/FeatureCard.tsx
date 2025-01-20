interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
	icon,
	title,
	description,
}) => {
	return (
		<div className="p-6 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 rounded-lg shadow-md">
			<div className="text-5xl mb-4 text-blue-600 dark:text-blue-400">
				{icon}
			</div>
			<h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
				{title}
			</h3>
			<p className="text-gray-700 dark:text-gray-300">{description}</p>
		</div>
	);
};

export default FeatureCard;
