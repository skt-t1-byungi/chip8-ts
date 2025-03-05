import { Screen, Renderer, CPU, Keyboard, Timer } from './chip8'
import loadRom, { ROMS } from './loadRom'
import { Progress } from 'rsup-progress'

const screen = new Screen()
const keyboard = new Keyboard()
const renderer = new Renderer(document.querySelector('canvas') as HTMLCanvasElement, screen)
const soundTimer = new Timer()
const delayTimer = new Timer()
const cpu = new CPU({
    screen,
    keyboard,
    delayTimer,
    soundTimer,
})

const progress = new Progress({ color: '#00ffff' })

const $ = document.querySelector.bind(document)

const $speed = $('#speed') as HTMLInputElement
const $roms = $('#roms') as HTMLSelectElement
const $rerun = $('#rerun') as HTMLButtonElement

$roms.innerHTML = ROMS.map(r => {
    return `<option value="${r}" ${r === 'IBM Logo.ch8' ? 'selected' : ''}>${r}</option>`
}).join('\n')

// prettier-ignore
const KEYMAP = {
    1: 1, 2: 2, 3: 3, 4: 0xc,
    q: 4, w: 5, e: 6, r: 0xd,
    a: 7, s: 8, d: 9, f: 0xe,
    z: 0xa, x: 0, c: 0xb, v: 0xf,
} as Record<string, number>

addEventListener('keydown', e => {
    const key = KEYMAP[e.key]
    if (key !== undefined) keyboard.press(key)
})
addEventListener('keyup', e => {
    const key = KEYMAP[e.key]
    if (key !== undefined) keyboard.release(key)
})

let tid: ReturnType<typeof setTimeout> | null = null
function run() {
    if (tid) clearTimeout(tid)
    cpu.reset()
    screen.clear()
    progress.promise(loadRom($roms.value as any), { min: 300, waitAnimation: true }).then(rom => {
        cpu.load(rom)
        function loop() {
            const speed = $speed.valueAsNumber
            tid = setTimeout(loop, 1000 / (60 * speed))
            delayTimer.tick()
            soundTimer.tick()
            cpu.cycle()
            renderer.render()
        }
        loop()
    })
}

run()
$roms.addEventListener('change', run)
$rerun.addEventListener('click', run)
