export function drawRect(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D | null, fillStyle: string) {
    if (!ctx) return
    ctx?.beginPath()
    ctx?.rect(x, y, width, height)
    ctx.fillStyle = fillStyle || "#000"
    ctx?.fill()
    ctx?.closePath()
}

export function cap(num: number, min: number, max: number): number {
    if (num < min) {
        num = min
    } else if (num > max) {
        num = max
    }

    return num
}