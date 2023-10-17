import { ScreenBuffer, Renderer, CPU } from './chip8'

const screenBuffer = new ScreenBuffer()
const renderer = new Renderer(document.querySelector('canvas') as HTMLCanvasElement, screenBuffer)

const cpu = new CPU(screenBuffer)
screenBuffer.xor(0, 0)
screenBuffer.xor(1, 1)
screenBuffer.xor(2, 2)
renderer.render()

setTimeout(() => {
    cpu.load(new Uint8Array([0x00, 0xe0]))
    cpu.cycle()
    renderer.render()
}, 500)
