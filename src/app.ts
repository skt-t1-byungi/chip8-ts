// CHIP-8 Emulator

class ScreenBuffer {
    #buffer = new Set<string>()
    toggle(x: number, y: number, value = !this.#buffer.has(`${x},${y}`)) {
        const pos = `${x},${y}`
        if (value) {
            this.#buffer.add(pos)
        } else {
            this.#buffer.delete(pos)
        }
    }
    *[Symbol.iterator]() {
        for (const pos of this.#buffer) {
            const [x, y] = pos.split(',').map(Number)
            yield { x, y }
        }
    }
}

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

const screenBuffer = new ScreenBuffer()
const renderer = new Renderer(document.querySelector('canvas') as HTMLCanvasElement, screenBuffer)

screenBuffer.toggle(0, 0)
screenBuffer.toggle(0, 1)
screenBuffer.toggle(0, 3)
screenBuffer.toggle(0, 6)

renderer.render()
