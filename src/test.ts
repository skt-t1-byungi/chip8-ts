import assert from 'node:assert'
import test from 'node:test'
import { CPU, ScreenBuffer } from './chip8'

// https://github.com/trapexit/chip-8_documentation

test('opcode', async t => {
    await t.test('CLS', () => {
        assert.deepEqual([...run([0x00, 0xe0]).screen], [])
    })
    await t.test('LD VX, NN', () => {
        const { cpu } = run([0x60, 0x11])
        assert.equal(cpu.debug.v[0], 0x11)
    })
    await t.test('ADD VX, NN', () => {
        const { cpu } = run([0x60, 0x11, 0x70, 0x4])
        assert.equal(cpu.debug.v[0], 0x15)
    })
})

function run(program: Uint8Array | number[]) {
    const screen = new ScreenBuffer()
    const cpu = new CPU(screen)
    cpu.load(new Uint8Array(program))

    let cycles = program.length / 2
    while (cycles--) {
        cpu.cycle()
    }

    return { screen, cpu }
}
