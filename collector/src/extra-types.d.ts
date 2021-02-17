declare namespace NodeJS {
  export interface Process {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    binding: (string) => any
  }
}

declare module 'http-parser-js'
