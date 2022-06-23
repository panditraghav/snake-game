import { drawRect } from "./utils"
import { Coordinates } from "./snake"

export class SnakeFood {
    private color: string
    private coordinates: Coordinates
    private width: number
    private height: number
    private ctx: CanvasRenderingContext2D | null

    constructor(coordinates: Coordinates, ctx: CanvasRenderingContext2D | null) {
        this.color = "#e69f43"
        this.coordinates = coordinates
        this.width = 20
        this.height = 20
        this.ctx = ctx
    }

    draw() {
        drawRect(this.coordinates.x,
            this.coordinates.y,
            this.width,
            this.height,
            this.ctx,
            this.color
        )
    }

    getCoordinates(): Coordinates {
        return this.coordinates
    }
}