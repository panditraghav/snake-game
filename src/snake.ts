import { drawRect } from "./utils"

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
        drawRect({
            x: this.coordinates.x,
            y: this.coordinates.y,
            width: this.width,
            height: this.height,
            fillStyle: this.color,
            ctx: this.ctx
        })
    }

    public move() {
        this.previousCoordinates = { ...this.coordinates }
        if (this.direction === "LEFT") {
            this.moveLeft()
        } else if (this.direction === "RIGHT") {
            this.moveRight()
        } else if (this.direction === "UP") {
            this.moveUp()
        } else {
            this.moveDown()
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

    private moveLeft() {
        this.coordinates.x -= this.width
    }

    private moveRight() {
        this.coordinates.x += this.width
    }

    private moveUp() {
        this.coordinates.y -= this.height
    }

    private moveDown() {
        this.coordinates.y += this.height
    }


}

export class SnakeBody {
    private coordinates: Coordinates
    private previousCoordinates: Coordinates
    private width: number
    private height: number
    private ctx: CanvasRenderingContext2D
    private color: string = "#000"

    constructor(coordinates: Coordinates, width: number, height: number, ctx) {
        this.coordinates = coordinates
        this.width = width
        this.height = height
        this.ctx = ctx
    }

    public draw() {
        drawRect({
            x: this.coordinates.x,
            y: this.coordinates.y,
            width: this.width,
            height: this.height,
            fillStyle: this.color,
            ctx: this.ctx
        })
    }

    public setCoordinates(coordinates: Coordinates) {
        this.previousCoordinates = { ...this.coordinates }
        this.coordinates = coordinates
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

    constructor(coordinates: Coordinates, unitWidth: number, unitHeight: number, direction: Direction, ctx: CanvasRenderingContext2D) {
        const snakeHead = new SnakeHead(coordinates, unitWidth, unitHeight, direction, ctx)
        this.snake.push(snakeHead)
        this.unitWidth = unitWidth
        this.unitHeight = unitHeight
        this.direction = direction
        this.ctx = ctx
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
}