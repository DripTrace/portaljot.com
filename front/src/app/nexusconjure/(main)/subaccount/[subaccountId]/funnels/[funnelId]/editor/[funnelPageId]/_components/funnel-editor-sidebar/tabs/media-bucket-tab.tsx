"use client";
import MediaComponent from "@/components/nexusconjure/media";
import { getMedia } from "@/utils/nexusconjure/queries";
import { GetMediaFiles } from "@/utils/nexusconjure/types";
import React, { useEffect, useState } from "react";

type Props = {
	subaccountId: string;
};

const MediaBucketTab = (props: Props) => {
	const [data, setdata] = useState<GetMediaFiles>(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await getMedia(props.subaccountId);
			setdata(response);
		};
		fetchData();
	}, [props.subaccountId]);

	return (
		<div className="h-[900px] overflow-scroll p-4">
			<MediaComponent data={data} subaccountId={props.subaccountId} />
		</div>
	);
};

export default MediaBucketTab;
