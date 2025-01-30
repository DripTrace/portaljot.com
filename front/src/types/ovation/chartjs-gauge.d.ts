// src/types/chartjs-gauge.d.ts
declare module "chartjs-gauge" {
    import { ChartTypeRegistry } from "chart.js";

    export class Gauge extends ChartTypeRegistry {
        constructor();
    }
}
