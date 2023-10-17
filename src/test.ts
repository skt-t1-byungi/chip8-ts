import assert from 'node:assert'
import test from 'node:test'
import { CPU, ScreenBuffer } from './chip8'

// https://en.wikipedia.org/wiki/CHIP-8

test('opcode', async t => {
    await t.test('00E0', () => {
        assert.deepEqual([...run([0x00, 0xe0]).screen], [])
    })
    await t.test('6XNN', () => {
        const { cpu } = run([0x60, 0x11])
        assert.equal(cpu.debug.v[0], 0x11)
    })
    await t.test('7XNN', () => {
        const { cpu } = run([0x60, 0x11, 0x70, 0x4])
        assert.equal(cpu.debug.v[0], 0x15)
    })
    await t.test('ANNN', () => {
        const { cpu } = run([0xa1, 0x12])
        assert.equal(cpu.debug.i, 0x112)
    })
    await t.test('DXYN', () => {
        // i = 0x204; draw(0, 0, height)
        const drawIr = (height: number) => [0xa2, 0x04, 0xd0, height]
        assert.deepEqual(
            [...run([...drawIr(1), 0b1001_1001], 2).screen],
            [
                [0, 0],
                [3, 0],
                [4, 0],
                [7, 0],
            ],
        )
        assert.deepEqual(
            [...run([...drawIr(2), 0b1001_1001, 0b0110_0001], 2).screen],
            [
                [0, 0],
                [3, 0],
                [4, 0],
                [7, 0],
                [1, 1],
                [2, 1],
                [7, 1],
            ],
        )
    })
})

function run(program: Uint8Array | number[], cycles = program.length / 2) {
    const screen = new ScreenBuffer()
    const cpu = new CPU(screen)
    cpu.load(new Uint8Array(program))
    while (cycles--) {
        cpu.cycle()
    }
    return { screen, cpu }
}
