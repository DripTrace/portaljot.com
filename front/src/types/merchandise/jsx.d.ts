import type { Session } from 'next-auth';

declare namespace JSX {
  interface IntrinsicAttributes {
    img: HTMLAttributes & {
      alt: string;
      src: string;
      loading?: 'lazy' | 'eager' | 'auto';
    };
  }
}
