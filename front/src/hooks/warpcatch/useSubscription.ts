"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "@/config/warpcatch/firebase";
import { collection, doc } from "firebase/firestore";

export const PRO_LIMIT = 100;
export const FREE_LIMIT = 3;

function useSubscription() {
	const [hasActiveMembership, setHasActiveMembership] = useState(null);
	const [isOverFileLimit, setIsOverFileLimit] = useState(false);
	const { user } = useUser();

	const [snapshot, loading, error] = useDocument(
		user && doc(db, "users", user?.id),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const [filesSnapshot, filesLoading, filesError] = useCollection(
		user && collection(db, "users", user?.id, "files")
	);

	useEffect(() => {
		if (!snapshot) return;

		const data = snapshot.data();

		// console.log("DEBUG 1 ", data);
		if (!data) return;
		// console.log("DEBUG 2 ", data);

		setHasActiveMembership(data.hasActiveMembership);
	}, [snapshot]);

	useEffect(() => {
		console.log("FILES SNAPSHOT", filesSnapshot?.docs);
		console.log("MEMBERSHIP STATUS", hasActiveMembership);
		// if (!filesSnapshot || hasActiveMembership === null) return;
		if (filesSnapshot === undefined || hasActiveMembership === null) {
			console.log("FILES SNAPSHOT UNDEFINED");
			// setIsOverFileLimit(true);
			return;
		}

		// const files = filesSnapshot?.docs;
		const files = filesSnapshot.docs;
		console.log("USERS FILES: ", files);

		const usersLimit = hasActiveMembership ? PRO_LIMIT : FREE_LIMIT;

		console.log(
			"Checking if user is over file limit",
			// files?.length,
			files.length,
			usersLimit
		);

		setIsOverFileLimit(files?.length >= usersLimit);
		// setIsOverFileLimit(Boolean(files?.length ?? 0 >= usersLimit));
		// setIsOverFileLimit(Boolean(files.length ?? 0 >= usersLimit));
		console.log("CHECK IS OVER FILE LIMIT", isOverFileLimit);
	}, [filesSnapshot, hasActiveMembership, PRO_LIMIT, FREE_LIMIT]);

	return {
		hasActiveMembership,
		isOverFileLimit,
		loading,
		error,
		filesLoading,
	};
}

export default useSubscription;
