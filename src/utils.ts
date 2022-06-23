interface DrawRectOptions {
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    fillStyle: string
}

export function drawRect(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D,fillStyle: string) {
    ctx.beginPath()
    ctx.rect(x, y, width, width)
    ctx.fillStyle = fillStyle || "#000"
    ctx.fill()
    ctx.closePath()
}

export function cap(num: number, min: number, max: number): number{
    if(num< min){
        num = min
    }else if(num > max){
        num = max
    }

    return num
}