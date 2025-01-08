import Link from "next/link";
import NavLinks, { NonUserLinks } from "./NavLinks";
import BrandLink from "./BrandLink";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useAuth } from "./authProvider";
import { Menu } from "lucide-react";

interface MobileNavbarProps {
	className?: string;
}

export default function MobileNavbar({ className }: MobileNavbarProps) {
	const auth = useAuth();
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="shrink-0 md:hidden"
				>
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<nav className="grid gap-6 text-lg font-medium">
					<BrandLink
						displayName={true}
						className="flex items-center gap-2 text-lg font-semibold"
					/>

					{NavLinks.map(
						(
							navLinkItem: {
								href: string;
								label: string;
								authRequired: boolean;
							},
							idx: number
						) => {
							const shouldHide =
								!auth?.isAuthenticated &&
								navLinkItem.authRequired;

							return shouldHide ? null : (
								<Link
									href={navLinkItem.href}
									key={`nav-links-b-${idx}`}
									className="text-muted-foreground hover:text-foreground"
								>
									{navLinkItem.label}
								</Link>
							);
						}
					)}

					{auth.isAuthenticated ? (
						<Link
							href="/dashboard/logout"
							className="text-muted-foreground hover:text-foreground"
						>
							Logout
						</Link>
					) : (
						<>
							{NonUserLinks.map((navLinkItem, idx) => {
								const shouldHide =
									!auth.isAuthenticated &&
									navLinkItem.authRequired;

								return shouldHide ? null : (
									<Link
										href={navLinkItem.href}
										key={`nav-links-c-${idx}`}
										className="text-muted-foreground hover:text-foreground"
									>
										{navLinkItem.label}
									</Link>
								);
							})}
						</>
					)}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
