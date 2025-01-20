export {};

declare global {
  interface Window {
    jQuery: typeof $;
    webPhone: any; // Add proper type when available
  }
}

interface JQuery {
  modal: (options?: any) => JQuery;
}
