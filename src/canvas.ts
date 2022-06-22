export function createCanvas(width: number, height: number): HTMLCanvasElement{

  const canvas: HTMLCanvasElement = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  canvas.style.border = "1px solid black"

  return canvas
}