interface DrawRectOptions {
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    fillStyle: string
}

export function drawRect({ x, y, width, height, ctx, fillStyle }: DrawRectOptions) {
    ctx.beginPath()
    ctx.rect(x, y, width, width)
    ctx.fillStyle = fillStyle 
    ctx.fill()
    ctx.closePath()
}