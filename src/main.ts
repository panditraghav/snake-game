import './style.css'
import { createCanvas } from './canvas'
import { cap } from './utils'
import { Snake } from './snake'
import { SnakeFood } from './food'

class Game {
  private ctx: CanvasRenderingContext2D | null
  private canvas: HTMLCanvasElement
  private canvasWidth: number
  private canvasHeight: number
  private bodyPartWidth: number
  private bodyPartHeight: number
  private intervalId: number | undefined
  private direction: "LEFT" | "RIGHT" | "UP" | "DOWN"
  private snake: Snake
  private food: SnakeFood
  private score: number
  private highScore: number
  private scoreElement: HTMLSpanElement
  private highScoreElement: HTMLSpanElement

  constructor() {
    this.canvasWidth = 500
    this.canvasHeight = 500
    this.bodyPartWidth = 20
    this.bodyPartHeight = 20
    this.canvas = createCanvas(this.canvasWidth, this.canvasHeight)
    this.ctx = this.canvas.getContext("2d")
    this.direction = "LEFT"
    this.score = 0
    this.highScore = 0
    this.scoreElement = document.getElementById("score") as HTMLSpanElement
    this.highScoreElement = document.getElementById("highScore") as HTMLSpanElement
    this.food = this.createFood()
    this.snake = new Snake(
      { x: this.bodyPartWidth * 8, y: this.bodyPartHeight * 8 },
      this.bodyPartWidth,
      this.bodyPartHeight,
      this.direction,
      this.ctx,
      this.food
    )
    this.addCanvasToDom()
    this.addMovementListeners()
    this.initDraw()
    this.initMovement()
    this.handleEatEvent()
    this.handleCollisionEvent()
    this.renderScore()
  }

  private renderScore() {
    this.scoreElement.innerText = `${this.score}`
    this.highScoreElement.innerText = `${this.highScore}`
  }


  private addCanvasToDom() {
    document.querySelector("#app")?.appendChild(this.canvas)
  }

  private addMovementListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp" && this.direction != "DOWN") {
        this.direction = "UP"
      } else if (e.key === "ArrowDown" && this.direction != "UP") {
        this.direction = "DOWN"
      } else if (e.key === "ArrowLeft" && this.direction != "RIGHT") {
        this.direction = "LEFT"
      } else if (e.key === "ArrowRight" && this.direction != "LEFT") {
        this.direction = "RIGHT"
      }
    })
  }

  private initDraw() {
    this.draw()
  }

  private draw() {
    this.ctx?.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.snake.draw()
    this.food.draw()
    this.snake.setDirection(this.direction)

    requestAnimationFrame(() => {
      this.draw()
    })
  }

  private initMovement() {
    this.intervalId = setInterval(() => {
      this.move()
    }, 150)
  }

  private move() {
    this.snake.move()
  }

  private createFood(): SnakeFood {
    let x = Math.floor(Math.random() * (this.canvasWidth / this.bodyPartWidth) + 1) * this.bodyPartWidth
    x = cap(x, 0, 480)
    let y = Math.floor(Math.random() * (this.canvasHeight / this.bodyPartHeight) + 1) * this.bodyPartHeight
    y = cap(y, 0, 480)
    const food = new SnakeFood({ x, y }, this.ctx)
    return food
  }

  private handleEatEvent() {
    this.canvas.addEventListener("eat", () => {
      this.score++
      this.food = this.createFood()
      this.snake.setFood(this.food)
      this.snake.increaseLength()
      this.renderScore()
    })
  }

  private handleCollisionEvent() {
    this.canvas.addEventListener("collision", () => {
      clearInterval(this.intervalId)
      this.handleGameOver()
    })
  }

  private handleGameOver() {
    alert("You lost, try again....")
    if (this.score > this.highScore) this.highScore = this.score
    this.score = 0
    this.renderScore()
    this.food = this.createFood()
    this.snake = new Snake(
      { x: this.bodyPartWidth * 8, y: this.bodyPartHeight * 8 },
      this.bodyPartWidth,
      this.bodyPartHeight,
      this.direction,
      this.ctx,
      this.food
    )
    this.initMovement()
  }
}

new Game()