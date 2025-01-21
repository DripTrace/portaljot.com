import ChatList from "@/components/exotalk/ChatList";
import ChatPermissionError from "@/components/exotalk/ChatPermissionError";

type Props = {
	params: {};
	searchParams: {
		error: string;
	};
};

async function App({ searchParams: { error } }: Props) {
	return (
		<div>
			{error && (
				<div className="m-2">
					<ChatPermissionError />
				</div>
			)}

			<ChatList />
		</div>
	);
}

export default App;
