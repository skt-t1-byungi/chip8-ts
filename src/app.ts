import { ScreenBuffer, Renderer, CPU } from './chip8'
import fs from 'fs'

const testRom = fs.readFileSync(__dirname + '/../roms/IBM.ch8')

const screenBuffer = new ScreenBuffer()
const renderer = new Renderer(document.querySelector('canvas') as HTMLCanvasElement, screenBuffer)

const cpu = new CPU(screenBuffer)
cpu.load(testRom)

let cycles = 40
try {
    while (cycles--) {
        cpu.cycle()
    }
} finally {
    renderer.render()
}
