import { URL } from 'url'
import { run, INSRaceResult } from 'nsrace'
import _ from 'lodash'

export type ISubmitResult = { host: string; response: INSRaceResult }[]

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

  for (let task of tasks) {
    result.push({
      host: task.host,
      response: await run({
        uri: task.uri,
      }),
    })
  }

  return result
}
