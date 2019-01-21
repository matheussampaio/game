import * as Colyseus from 'colyseus.js' // eslint-disable-line import/extensions

import { getWebsocketURL } from './utils'

export default class GameAPI {
  constructor() {
    const websocketURL = getWebsocketURL()

    this.client = new Colyseus.Client(websocketURL)
    this.players = {}
    this.room = null
  }

  joinBattleRoom() {
    this.room = this.client.join('battle')
  }
}
