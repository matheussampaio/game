import * as Colyseus from 'colyseus.js'

import { getWebsocketURL } from './utils'

const client = new Colyseus.Client(getWebsocketURL())

client.joinOrCreate('battle')
  .then((room) => {
    console.log(room.sessionId, 'joined', room.name)

    room.onStateChange.once((state) => {
      console.log('initial state', state)
    })

    room.onStateChange((state) => {
      console.log('state changed', state)
    })

    room.onMessage((message) => {
      console.log('received message from server', message)
    })
  })
  .catch((error) => {
    console.error('JOIN ERROR:', error)
  })
