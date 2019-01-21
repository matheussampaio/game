export function getWebsocketURL() {
  const host = window.document.location.host.replace(/:.*/, '')
  const protocol = location.protocol.replace('http', 'ws')
  const port = location.port ? `:${location.port}` : ''

  const url = `${protocol}${host}${port}`

  return url
}
