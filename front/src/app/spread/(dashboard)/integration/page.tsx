import { onGetPaymentConnected } from "@/actions/spread/settings";
import InfoBar from "@/components/spread/infobar";
import IntegrationsList from "@/components/spread/integrations";

const IntegrationsPage = async () => {
	const payment = await onGetPaymentConnected();

	const connections = {
		stripe: payment ? true : false,
	};

	return (
		<>
			<InfoBar />
			<IntegrationsList connections={connections} />
		</>
	);
};

export default IntegrationsPage;
