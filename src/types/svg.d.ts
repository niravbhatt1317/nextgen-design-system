/* A mark file imported by a story (`import aws from './marks/aws.svg'`) is its URL, as Vite serves it. */
declare module '*.svg' {
  const src: string;
  export default src;
}
