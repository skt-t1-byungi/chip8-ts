// CHIP-8 Emulator

type ScreenBuffer = Set<{ x: number; y: number }>

class Renderer {
    static readonly SCALE = 10
    #canvas: HTMLCanvasElement
    #buffer: ScreenBuffer
    constructor(canvas: HTMLCanvasElement, buffer: ScreenBuffer) {
        this.#canvas = canvas
        this.#buffer = buffer
        this.#canvas.width = 64 * Renderer.SCALE
        this.#canvas.height = 32 * Renderer.SCALE
    }
    render() {
        const ctx = this.#canvas.getContext('2d')
        if (!ctx) {
            throw new Error('Could not get 2d context')
        }
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
        ctx.fillStyle = '#00ffff'
        for (const { x, y } of this.#buffer) {
            ctx.fillRect(x * Renderer.SCALE, y * Renderer.SCALE, Renderer.SCALE - 1, Renderer.SCALE - 1)
        }
    }
}

const screenBuffer = new Set<{ x: number; y: number }>()
const renderer = new Renderer(document.querySelector('canvas') as HTMLCanvasElement, screenBuffer)

screenBuffer.add({ x: 63, y: 0 })
screenBuffer.add({ x: 63, y: 1 })
screenBuffer.add({ x: 63, y: 31 })
screenBuffer.add({ x: 63, y: 30 })

renderer.render()
