import { Room } from 'colyseus'
import { Schema, type } from '@colyseus/schema'
import { Body, Engine, World, Bodies } from 'matter-js'

class Position extends Schema {
  @type('number')
  x = 0

  @type('number')
  y = 0
}

class State extends Schema {
  @type(Position)
  position = new Position()
}

export default class BattleRoom extends Room<State> {
  maxClients = 2
  patchRate = 1000 / 60

  engine: Engine
  boxA: Body

  onCreate() {
    this.setState(new State())

    this.engine = Engine.create()

    this.engine.world.gravity.y = 0.02

    this.boxA = Bodies.rectangle(100, 100, 20, 20, {
      friction: 0.005,
      frictionAir: 0,
      restitution: 0.9
    })

    World.add(this.engine.world, [
      this.boxA,
      // walls
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(400, 606, 800, 50.5, { isStatic: true })
    ])

    this.setSimulationInterval((deltaTime) => this.update(deltaTime))
  }

  onMessage() {
  }

  update(deltaTime: number) {
    Engine.update(this.engine, deltaTime)

    this.state.position.x = this.boxA.position.x
    this.state.position.y = this.boxA.position.y
  }
}
