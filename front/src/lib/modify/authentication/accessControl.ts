import { AccessControl } from "accesscontrol";

const ac = new AccessControl();

ac.grant("guest").readAny("home");

ac.grant("user")
	.extend("guest")
	.readOwn("profile")
	.updateOwn("profile")
	.readAny("content");

ac.grant("admin")
	.extend("user")
	.createAny("content")
	.updateAny("content")
	.deleteAny("content");

ac.grant("owner")
	.extend("admin")
	.createAny("users")
	.readAny("users")
	.updateAny("users")
	.deleteAny("users");

ac.lock();

export default ac;
