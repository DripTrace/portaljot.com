const NavLinks = [
	{
		label: "Dashboard",
		authRequired: false,
		href: "/dashboard",
	},
	{
		label: "Waitlist",
		authRequired: true,
		href: "/dashboard/waitlists",
	},
];

export const NonUserLinks = [
	{
		label: "Signup",
		authRequired: false,
		href: "/dashboard/signup",
	},
	{
		label: "Login",
		authRequired: false,
		href: "/dashboard/login",
	},
];
export default NavLinks;
