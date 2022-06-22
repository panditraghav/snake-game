import './style.css'
import { createCanvas } from './canvas'
import { drawRect } from './utils'
import { Snake, Direction } from './snake'

const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 500
const CELL_WIDTH = 20
const CELL_HEIGHT = 20

const app = document.querySelector<HTMLDivElement>('#app')!
const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
const ctx = canvas.getContext("2d")
let direction: Direction = "LEFT"

app.appendChild(canvas)

document.addEventListener("keydown", (e) => {
  console.log(e.key)
  if (e.key === "ArrowUp") {
    direction = "UP"
  } else if (e.key === "ArrowDown") {
    direction = "DOWN"
  } else if (e.key === "ArrowLeft") {
    direction = "LEFT"
  } else if (e.key === "ArrowRight") {
    direction = "RIGHT"
  }
})

const snake = new Snake({ x: 250, y: 250 }, CELL_WIDTH, CELL_HEIGHT, direction, ctx)
let num = 2
function draw() {
  ctx.clearRect(0, 0, 500, 500)
  snake.draw()
  snake.setDirection(direction)
  snake.move()
  if (num === 2 || num === 8 || num === 12) {
    snake.increaseLength()
  }
  num++
}

setInterval(draw, 1000)