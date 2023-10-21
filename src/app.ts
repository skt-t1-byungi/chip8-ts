import { Screen, Renderer, CPU, Keyboard, Timer } from './chip8'
import fs from 'fs'

const testRom = fs.readFileSync(__dirname + '/../roms/IBM.ch8')

const screen = new Screen()
const keyboard = new Keyboard()
const renderer = new Renderer(document.querySelector('canvas') as HTMLCanvasElement, screen)

const cpu = new CPU({
    screen,
    keyboard,
})
cpu.load(testRom)

let cycles = 40
try {
    while (cycles--) {
        cpu.cycle()
    }
} finally {
    renderer.render()
}
