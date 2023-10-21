import assert from 'node:assert'
import test from 'node:test'
import { CPU, ScreenBuffer } from './chip8'

// https://en.wikipedia.org/wiki/CHIP-8

test('00E0', () => {
    assert.deepEqual([...run([0x00, 0xe0]).screen], [])
})

test('1NNN', () => {
    const { cpu } = run([0x12, 0x34])
    assert.equal(cpu.debug.pc, 0x234)
})

test('Stack', async t => {
    await t.test('2NNN', () => {
        const { cpu } = run([0x22, 0x34])
        assert.equal(cpu.debug.pc, 0x234)
        assert.deepEqual(cpu.debug.stack, [0x202])
    })
    await t.test('00EE', () => {
        const { cpu } = run([0x22, 0x34, ...Array(0x32).fill(0), 0x00, 0xee], 2)
        assert.equal(cpu.debug.pc, 0x202)
    })
})

test('6XNN', () => {
    const { cpu } = run([0x60, 0x11])
    assert.equal(cpu.debug.v[0], 0x11)
})

test('7XNN', () => {
    const { cpu } = run([0x60, 0x11, 0x70, 0x4])
    assert.equal(cpu.debug.v[0], 0x15)
})

test('ANNN', () => {
    const { cpu } = run([0xa1, 0x12])
    assert.equal(cpu.debug.i, 0x112)
})

test('DXYN', () => {
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

test('3XNN', () => {
    // prettier-ignore
    const { cpu } = run([
            0x60, 0x11, // v[0] = 0x11
            0x30, 0x11, // if (v[0] === 0x11) pc += 2
            0x60, 0x22, // v[0] = 0x22
            0x61, 0x22, // v[1] = 0x22
        ])
    assert.notEqual(cpu.debug.v[0], 0x22)
    assert.equal(cpu.debug.v[1], 0x22)

    // prettier-ignore
    const { cpu: cpu2 } = run([
            0x60, 0x11, // v[0] = 0x11
            0x30, 0x22, // if (v[0] === 0x22) pc += 2
            0x60, 0x22, // v[0] = 0x22
            0x61, 0x22, // v[1] = 0x22
        ])
    assert.equal(cpu2.debug.v[0], 0x22)
    assert.equal(cpu2.debug.v[1], 0x22)
})

test('4XNN', () => {
    // prettier-ignore
    const { cpu } = run([
            0x60, 0x11, // v[0] = 0x11
            0x40, 0x11, // if (v[0] !== 0x11) pc += 2
            0x60, 0x22, // v[0] = 0x22
            0x61, 0x22, // v[1] = 0x22
        ])
    assert.equal(cpu.debug.v[0], 0x22)
    assert.equal(cpu.debug.v[1], 0x22)

    // prettier-ignore
    const { cpu: cpu2 } = run([
            0x60, 0x11, // v[0] = 0x11
            0x40, 0x22, // if (v[0] !== 0x22) pc += 2
            0x60, 0x22, // v[0] = 0x22
            0x61, 0x22, // v[1] = 0x22
        ])
    assert.notEqual(cpu2.debug.v[0], 0x22)
    assert.equal(cpu2.debug.v[1], 0x22)
})

test('5XY0', () => {
    // prettier-ignore
    const { cpu } = run([
            0x60, 0x11, // v[0] = 0x11
            0x61, 0x11, // v[1] = 0x11
            0x50, 0x10, // if (v[0] === v[1]) pc += 2
            0x60, 0x22, // v[0] = 0x22
            0x61, 0x22, // v[1] = 0x22
        ])
    assert.notEqual(cpu.debug.v[0], 0x22)
    assert.equal(cpu.debug.v[1], 0x22)

    // prettier-ignore
    const { cpu: cpu2 } = run([
            0x60, 0x11, // v[0] = 0x11
            0x61, 0x22, // v[1] = 0x22
            0x50, 0x10, // if (v[0] === v[1]) pc += 2
            0x60, 0x22, // v[0] = 0x22
            0x61, 0x22, // v[1] = 0x22
        ])
    assert.equal(cpu2.debug.v[0], 0x22)
    assert.equal(cpu2.debug.v[1], 0x22)
})

test('8XY0 (=)', () => {
    // prettier-ignore
    const { cpu } = run([
            0x60, 0x11, // v[0] = 0x11
            0x81, 0x00, // v[1] = v[0]
        ])
    assert.equal(cpu.debug.v[1], 0x11)
})

test('8XY1 (or)', () => {
    // prettier-ignore
    const { cpu } = run([
            0x60, 0b1000_0001, // v[0] = 0b1000_0001
            0x61, 0b0000_0110, // v[1] = 0b0000_0110
            0x80, 0x11, // v[0] |= v[1]
        ])
    assert.equal(cpu.debug.v[0], 0b1000_0111)
})

test('8XY2 (and)', () => {
    // prettier-ignore
    const { cpu } = run([
            0x60, 0b1000_0001, // v[0] = 0b1000_0001
            0x61, 0b0000_0111, // v[1] = 0b0000_0111
            0x80, 0x12, // v[0] &= v[1]
        ])
    assert.equal(cpu.debug.v[0], 0b0000_0001)
})

test('8XY3 (xor)', () => {
    // prettier-ignore
    const { cpu } = run([
            0x60, 0b1000_0001, // v[0] = 0b1000_0001
            0x61, 0b0000_0111, // v[1] = 0b0000_0111
            0x80, 0x13, // v[0] ^= v[1]
        ])
    assert.equal(cpu.debug.v[0], 0b1000_0110)
})

test('8XY4 (+=)', async t => {
    await t.test('no carry', () => {
        // prettier-ignore
        const { cpu } = run([
                0x60, 0x11, // v[0] = 0x11
                0x61, 0x22, // v[1] = 0x22
                0x80, 0x14, // v[0] += v[1]
            ])
        assert.equal(cpu.debug.v[0], 0x33)
        assert.equal(cpu.debug.v[0xf], 0)
    })
    await t.test('carry', () => {
        // prettier-ignore
        const { cpu } = run([
                0x60, 0xfe, // v[0] = 0xfe
                0x61, 0x03, // v[1] = 0x03
                0x80, 0x14, // v[0] += v[1]
            ])
        assert.equal(cpu.debug.v[0], 0x01)
    })
})

test('8XY5 (-=)', async t => {
    await t.test('no borrow', () => {
        // prettier-ignore
        const { cpu } = run([
                0x60, 0x22, // v[0] = 0x22
                0x61, 0x11, // v[1] = 0x11
                0x80, 0x15, // v[0] -= v[1]
            ])
        assert.equal(cpu.debug.v[0], 0x11)
        assert.equal(cpu.debug.v[0xf], 1)
    })
    await t.test('borrow', () => {
        // prettier-ignore
        const { cpu } = run([
                0x60, 0x11, // v[0] = 0x11
                0x61, 0x22, // v[1] = 0x22
                0x80, 0x15, // v[0] -= v[1]
            ])
        assert.equal(cpu.debug.v[0], 0xef)
        assert.equal(cpu.debug.v[0xf], 0)
    })
})

test('8XY6 (>>)', () => {
    // prettier-ignore
    const r1 = run([
            0x60, 0b1000_0001, // v[0] = 0b1000_0001
            0x80, 0x16, // v[0] >>= 1
        ])
    assert.equal(r1.cpu.debug.v[0], 0b0100_0000)
    assert.equal(r1.cpu.debug.v[0xf], 1)

    // prettier-ignore
    const r2 = run([
            0x60, 0b101_1100, // v[0] = 0b101_1100
            0x80, 0x16, // v[0] >>= 1
        ])
    assert.equal(r2.cpu.debug.v[0], 0b010_1110)
    assert.equal(r2.cpu.debug.v[0xf], 0)
})

test.todo('8XY7 (-)', async t => {})

function run(program: Uint8Array | number[], cycles = program.length / 2) {
    const screen = new ScreenBuffer()
    const cpu = new CPU(screen)
    cpu.load(new Uint8Array(program))
    while (cycles--) {
        cpu.cycle()
    }
    return { screen, cpu }
}
