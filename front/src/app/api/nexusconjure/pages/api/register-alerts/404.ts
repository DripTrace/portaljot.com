import React from "react";
import { renderToString } from "react-dom/server";
import NotFound from "../../../app/not-found";

const custom404 = renderToString(React.createElement(NotFound));

export default function Custom404() {
	return custom404;
}
