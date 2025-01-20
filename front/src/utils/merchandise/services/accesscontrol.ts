import { AccessControl } from "accesscontrol";

const ac = new AccessControl();

ac.grant("owner")
    .resource("users")
    .readAny()
    .createAny()
    .updateAny()
    .deleteAny();

ac.grant("guest").resource("users").readOwn().updateOwn();

ac.grant("admin")
    .resource(["users", "app"])
    .readAny()
    .createAny()
    .updateAny()
    .deleteAny();

ac.lock();

export default ac;
