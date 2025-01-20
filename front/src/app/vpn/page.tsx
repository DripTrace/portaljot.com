// app/vpn/page.tsx
// import { getTrueNASConfig } from "../actions/getTrueNASConfig";
// import TrueNASConfig from "./TrueNASConfig.tsx";
// import TrueNASConfig from "@/vpn/TrueNASConfig";

import { getTrueNASConfig } from "@/utils/trunasClient";
import TrueNASConfig from "./TrueNASConfig";

export default async function TrunasPage() {
    // const result = await getTrueNASConfig();

    return (
        <div>
            <h1>TrueNAS Configuration</h1>
            {/* <TrueNASConfig result={result} /> */}
        </div>
    );
}
