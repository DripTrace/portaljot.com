// "use client";

// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
//   useUser,
// } from "@clerk/nextjs";
// import BreadCrumbs from "./BreadCrumbs";

// function Header() {
//   const { user } = useUser();

//   return (
//     <div className="flex items-center justify-between p-5">
//       {user && (
//         <h1 className="text-2xl">
//           {user?.firstName}
//           {`'s`} Space
//         </h1>
//       )}

//       <BreadCrumbs />

//       <div>
//         <SignedOut>
//           <SignInButton />
//         </SignedOut>
//         <SignedIn>
//           <UserButton />
//         </SignedIn>
//       </div>
//     </div>
//   );
// }

// export default Header;

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import BreadCrumbs from "./BreadCrumbs";

function Header() {
	const { data: session } = useSession();

	return (
		<div className="flex items-center justify-between p-5">
			{session?.user ? (
				<h1 className="text-2xl">
					{session.user.name?.split(" ")[0]}'s Space
				</h1>
			) : (
				<h1 className="text-2xl">Welcome</h1>
			)}

			<BreadCrumbs />

			<div>
				{!session && (
					<button
						onClick={() => signIn()}
						className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
					>
						Sign In
					</button>
				)}
				{session && (
					<button
						onClick={() => signOut()}
						className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
					>
						Sign Out
					</button>
				)}
			</div>
		</div>
	);
}

export default Header;
