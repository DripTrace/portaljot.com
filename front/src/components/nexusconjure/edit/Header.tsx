"use client";

import {
	uploadMedia,
	addText,
	updateSettings,
	exportToJson,
} from "../../../lib/edit/playerFunctions";

const Header = () => {
	return (
		<div id="header">
			<div onClick={uploadMedia}>+ media</div>
			<div onClick={addText}>+ text</div>
			<div onClick={updateSettings}>[...]</div>
			<div id="export" onClick={exportToJson}>
				export
			</div>
			<a
				href="https://github.com/russpalms/mebm_dev"
				target="_blank"
				rel="noopener noreferrer"
			>
				src
			</a>
		</div>
	);
};

export default Header;
