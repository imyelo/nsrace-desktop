import { URL } from 'node:url'
import { race, IRaceResult } from 'nsrace'
import _ from 'lodash'

export type ISubmitResult = { host: string; response: IRaceResult }[]

const DEFAULT_PING_TIMEOUT = 1000
const DEFAULT_FETCH_TIMEOUT = 1000

const getHostnameFromURI = (uri: string) => {
  try {
    const url = new URL(uri)
    return url.hostname
  } catch (e) {
    return uri
  }
}

export const submit = async (uris: string[]) => {
  const tasks = _.uniqBy(
    uris.map(uri => ({
      uri,
      host: getHostnameFromURI(uri),
    })),
    'host'
  )
  const result: ISubmitResult = []

  for (const task of tasks) {
    result.push({
      host: task.host,
      // eslint-disable-next-line no-await-in-loop
      response: await race({
        uri: task.uri,
        pingTimeout: DEFAULT_PING_TIMEOUT,
        fetchTimeout: DEFAULT_FETCH_TIMEOUT,
      }),
    })
  }

  return result
}
