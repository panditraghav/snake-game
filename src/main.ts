import './style.css'
import { createCanvas } from './canvas'
import { cap, drawRect } from './utils'
import { Snake, Direction } from './snake'
import { SnakeFood } from './food'

class Game {
    private ctx: CanvasRenderingContext2D
    private canvas: HTMLCanvasElement
    private canvasWidth: number
    private canvasHeight: number
    private bodyPartWidth: number
    private bodyPartHeight: number
    private direction: "LEFT" | "RIGHT" | "UP" | "DOWN"
    private snake: Snake
    private food: SnakeFood
    private score: number
    private scoreElement: HTMLSpanElement

    constructor() {
      this.canvasWidth = 500
      this.canvasHeight = 500
      this.bodyPartWidth = 20
      this.bodyPartHeight = 20
      this.canvas = createCanvas(this.canvasWidth, this.canvasHeight)
      this.ctx = this.canvas.getContext("2d")
      this.score = 0
      this.scoreElement = document.getElementById("score") as HTMLSpanElement
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
      this.renderScore()
    }

    private renderScore(){
      this.scoreElement.innerText = this.score
    }

    private addCanvasToDom() {
      document.querySelector("#app")?.appendChild(this.canvas)
    }

    private addMovementListeners() {
      document.addEventListener("keydown", (e) => {
        console.log(e.key)
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
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.snake.draw()
      this.food.draw()
      this.snake.setDirection(this.direction)

      requestAnimationFrame(() => {
        this.draw()
      })
    }

    private initMovement() {
      setInterval(() => {
        this.move()
      }, 200)
    }

    private move() {
      this.snake.move()
    }

    private createFood(): SnakeFood {
      let x = Math.floor(Math.random() * (this.canvasWidth / this.bodyPartWidth) + 1) * this.bodyPartWidth
      x = cap(x,0,480)
      let y = Math.floor(Math.random() * (this.canvasHeight / this.bodyPartHeight) + 1) * this.bodyPartHeight
      y = cap(y,0,480)
      const food = new SnakeFood({ x, y }, this.ctx)
      console.log(food)
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
  }

new Game()