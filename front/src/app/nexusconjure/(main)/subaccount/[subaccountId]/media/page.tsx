import BlurPage from "@/components/nexusconjure/global/blur-page";
import MediaComponent from "@/components/nexusconjure/media";
import { getMedia } from "@/utils/nexusconjure/queries";
import React from "react";

type Props = {
	params: { subaccountId: string };
};

const MediaPage = async ({ params }: Props) => {
	const data = await getMedia(params.subaccountId);

	return (
		<BlurPage>
			<MediaComponent data={data} subaccountId={params.subaccountId} />
		</BlurPage>
	);
};

export default MediaPage;
