import { drawRect } from "./utils"
import { SnakeFood } from "./food"

export type Direction = "LEFT" | "RIGHT" | "UP" | "DOWN"
interface Coordinates {
    x: number,
    y: number
}

export class SnakeHead {
    private coordinates: Coordinates
    private previousCoordinates: Coordinates
    private width: number
    private height: number
    private ctx: CanvasRenderingContext2D
    private color: string = "#FF0000"
    private direction: Direction = "LEFT"

    constructor(coordinates: Coordinates, width: number, height: number, direction: Direction, ctx) {
        this.coordinates = coordinates
        this.width = width
        this.height = height
        this.direction = direction
        this.ctx = ctx
    }

    public draw() {
        drawRect(
            this.coordinates.x,
            this.coordinates.y,
            this.width,
            this.height,
            this.ctx,
            this.color,
        )
    }

    public move() {
        this.previousCoordinates = { ...this.coordinates }
        const canvasWidth = this.ctx.canvas.width
        const canvasHeight = this.ctx.canvas.height


        //Move snake according to direction
        if (this.direction === "LEFT") {
            this.coordinates.x -= this.width
        } else if (this.direction === "RIGHT") {
            this.coordinates.x += this.width
        } else if (this.direction === "UP") {
            this.coordinates.y -= this.height
        } else {
            this.coordinates.y += this.height
        }

        //Make snake appear on other side if it crosses border
        if (this.coordinates.x == canvasWidth) {
            this.coordinates.x = 0
        } else if (this.coordinates.x < 0) {
            this.coordinates.x = canvasWidth - this.width
        } else if (this.coordinates.y == canvasHeight) {
            this.coordinates.y = 0
        } else if (this.coordinates.y < 0) {
            this.coordinates.y = canvasHeight - this.height
        }
    }

    public setDirection(direction: Direction) {
        this.direction = direction
    }

    public getCoordinates(): Coordinates {
        return this.coordinates
    }

    public getPreviousCoordinates(): Coordinates {
        return this.previousCoordinates
    }
}

export class SnakeBody {
    private coordinates: Coordinates
    private previousCoordinates: Coordinates
    private width: number
    private height: number
    private ctx: CanvasRenderingContext2D
    private color: string = "#000"

    constructor(coordinates: Coordinates, width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.coordinates = coordinates
        this.width = width
        this.height = height
        this.ctx = ctx
    }

    public draw() {
        drawRect(
            this.coordinates.x,
            this.coordinates.y,
            this.width,
            this.height,
            this.ctx,
            this.color,
        )
    }

    public setCoordinates(coordinates: Coordinates) {
        this.previousCoordinates = { ...this.coordinates }
        this.coordinates = coordinates
    }

    public getCoordinates(): Coordinates{
        return this.coordinates
    }

    public getPreviousCoordinates(): Coordinates {
        return this.previousCoordinates
    }
}


export class Snake {
    private snake: Array<SnakeHead | SnakeBody> = new Array<SnakeHead | SnakeBody>()
    private unitWidth: number
    private unitHeight: number
    private ctx: CanvasRenderingContext2D
    private direction: Direction = "LEFT"
    private food: SnakeFood

    constructor(
        coordinates: Coordinates,
        unitWidth: number,
        unitHeight: number,
        direction: Direction,
        ctx: CanvasRenderingContext2D,
        food: SnakeFood
    ) {
        const snakeHead = new SnakeHead(coordinates, unitWidth, unitHeight, direction, ctx)
        const snakeBodyPart = new SnakeBody(coordinates, unitWidth, unitHeight, ctx)
        this.snake.push(snakeHead, snakeBodyPart)
        this.unitWidth = unitWidth
        this.unitHeight = unitHeight
        this.direction = direction
        this.food = food
        this.ctx = ctx
    }

    private checkForEatEvent() {
        const headCoordinates = this.snake[0].getCoordinates() as Coordinates
        const foodCoordinates = this.food.getCoordinates()
        if (headCoordinates.x === foodCoordinates.x && headCoordinates.y === foodCoordinates.y) {
            const eatEvent = new CustomEvent("eat")
            this.ctx.canvas.dispatchEvent(eatEvent)
        }
    }

    private checkForCollision() {
        const snakeHeadCoordinates: Coordinates = this.snake[0].getCoordinates()
        for (let i = 1; i < this.snake.length; i++) {
            let snakeBodyPartCoordinates: Coordinates = this.snake[i].getCoordinates()
            if (snakeHeadCoordinates.x == snakeBodyPartCoordinates.x &&
                snakeHeadCoordinates.y == snakeBodyPartCoordinates.y) {
                    const collisionEvent = new CustomEvent("collision")
                    this.ctx.canvas.dispatchEvent(collisionEvent)
            }
        }
    }

    public draw() {
        this.snake.forEach(unit => {
            unit.draw()
        })
    }

    public move() {
        this.snake[0].move()
        for (let i = 1; i < this.snake.length; i++) {
            let thisSnakePart: SnakeBody = this.snake[i]
            let snakeNextPart: SnakeBody = this.snake[i - 1]
            thisSnakePart.setCoordinates(snakeNextPart.getPreviousCoordinates())
        }
        this.checkForEatEvent()
        this.checkForCollision()
    }

    public increaseLength() {
        if (this.snake[this.snake.length - 1].getPreviousCoordinates()) {
            const snakeBodyPart = new SnakeBody(this.snake[this.snake.length - 1].getPreviousCoordinates(), this.unitWidth, this.unitHeight, this.ctx)
            this.snake.push(snakeBodyPart)
        }
    }
    public setDirection(direction: Direction) {
        this.direction = direction
        this.snake[0].setDirection(direction)
    }

    public setFood(food: SnakeFood) {
        this.food = food
    }
}