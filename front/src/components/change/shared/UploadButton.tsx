import type { ChangeEvent } from "react";

export type UploadButtonProps = {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	accept: string;
};
export const UploadButton = (props: UploadButtonProps) => {
	return (
		<label htmlFor="fileInput" className={props.className}>
			<input
				id="fileInput"
				type="file"
				accept={props.accept}
				className="hidden"
				onChange={props.onChange}
			/>
			Upload
		</label>
	);
};
