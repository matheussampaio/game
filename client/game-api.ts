import * as Colyseus from 'colyseus.js' // eslint-disable-line import/extensions

import { getWebsocketURL } from './utils'

export default class GameAPI {
  client: Colyseus.Client
  room: Colyseus.Room

  constructor() {
    const websocketURL = getWebsocketURL()

    this.client = new Colyseus.Client(websocketURL)
    this.room = null
  }

  async connect(roomName: string) {
    this.room = await this.client.joinOrCreate(roomName)
  }
}
