declare module "react-svgmt" {
    import * as React from "react";

    interface SvgLoaderProps {
        path?: string;
        svgXML?: string;
        width?: string | number;
        height?: string | number;
        className?: string;
        id?: string;
    }

    export class SvgLoader extends React.Component<SvgLoaderProps> {}
}
