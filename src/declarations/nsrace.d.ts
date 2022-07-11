declare module 'nsrace' {
  function noop (...args: unknown[]): void
  export interface INSRaceOption {
    uri: string
    pingTimeout?: number
    fetchTimeout?: number
    verbose?: noop
    progress?: {
      noop
      success: noop
      warn: noop
    }
  }
  export interface INSRaceRecord {
    duration: number
    ip: string
    providers: string[]
  }
  export interface INSRaceResult {
    isDomainURI: boolean
    times: INSRaceRecord[]
  }
  export function run (options: INSRaceOption): Promise<INSRaceResult>
}
