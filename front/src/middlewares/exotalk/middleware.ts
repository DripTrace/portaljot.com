import { withAuth } from "next-auth/middleware";

export default withAuth;

export const config = {
	matcher: ["/exotalk/chat", "/exotalk/chat/:id*", "/exotalk/register"],
};
