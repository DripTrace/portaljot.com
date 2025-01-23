"use client";

import { Provider } from "react-redux";
import SipClientLayoutContent from "./SipClientLayoutContent";
import convoStore from "@/lib/clinicviews/llpmg/redux/stores/convoStore";
import Header from "../Header";
import Footer from "../Footer";

interface ClientLayoutProps {
	children: React.ReactNode;
}

const SipClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
	return (
		<Provider store={convoStore}>
			<SipClientLayoutContent>
				<main className="bg-blue-100 dark:bg-gray-900 flex-grow">
					{children}
				</main>
			</SipClientLayoutContent>
		</Provider>
	);
};

export default SipClientLayout;
