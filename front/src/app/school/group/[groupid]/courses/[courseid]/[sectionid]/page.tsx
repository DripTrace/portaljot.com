import { onAuthenticatedUser } from "@/actions/feature/school/auth";
import { onGetGroupInfo } from "@/actions/feature/school/groups";
import { CourseContentForm } from "@/components/school/forms/course-content";

type Props = {
	params: { sectionid: string; groupid: string };
};

const CourseModuleSection = async ({ params }: Props) => {
	const user = await onAuthenticatedUser();
	const group = await onGetGroupInfo(params.groupid);

	return (
		<CourseContentForm
			groupid={group.group?.userId!}
			sectionid={params.sectionid}
			userid={user.id!}
		/>
	);
};

export default CourseModuleSection;
