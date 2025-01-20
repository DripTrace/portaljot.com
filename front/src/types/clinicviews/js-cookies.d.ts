// src/declarations.d.ts

declare module "js-cookies" {
    export function get(name: string): string | null;
    export function set(name: string, value: string, options?: any): void;
    export function remove(name: string, options?: any): void;
}
