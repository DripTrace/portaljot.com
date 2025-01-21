import { generatePortalLink } from "@/actions/exotalk/registerActions";

function ManageAccountButton() {
	return (
		<form action={generatePortalLink}>
			<button type="submit">Manage Billing</button>
		</form>
	);
}

export default ManageAccountButton;
