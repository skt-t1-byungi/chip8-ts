// CHIP-8 emulator

export class CPU {
    #memory = new Uint8Array(4096)
    #pc = 0x200
    #v = new Uint8Array(16)
    #i = 0
    #stack = [] as number[]
    #screen: ScreenBuffer
    constructor(screen: ScreenBuffer) {
        this.#screen = screen
    }
    reset() {
        this.#pc = 0x200
        this.#v.fill(0)
        this.#i = 0
        this.#stack.fill(0)
        this.#memory.fill(0)
    }
    load(program: Uint8Array) {
        this.#memory.set(program, 0x200)
    }
    cycle() {
        const ir = new IR((this.#memory[this.#pc++] << 8) | this.#memory[this.#pc++])
        switch (ir.type) {
            case 0x00_00: {
                switch (ir.NNN) {
                    case 0xe0:
                        this.#screen.clear()
                        return
                    case 0xee:
                        if (this.#stack.length === 0) {
                            throw new Error('Stack underflow')
                        }
                        this.#pc = this.#stack.pop()!
                        return
                }
                return // void
            }
            case 0x10_00: {
                this.#pc = ir.NNN
                return
            }
            case 0x20_00: {
                this.#stack.push(this.#pc)
                this.#pc = ir.NNN
                return
            }
            case 0x30_00: {
                if (this.#v[ir.X] === ir.NN) this.#pc += 2
                return
            }
            case 0x40_00: {
                if (this.#v[ir.X] !== ir.NN) this.#pc += 2
                return
            }
            case 0x50_00: {
                if (this.#v[ir.X] === this.#v[ir.Y]) this.#pc += 2
                return
            }
            case 0x60_00: {
                this.#v[ir.X] = ir.NN
                return
            }
            case 0x70_00: {
                this.#v[ir.X] += ir.NN
                return
            }
            case 0x80_00: {
                switch (ir.N) {
                    case 0x0: {
                        this.#v[ir.X] = this.#v[ir.Y]
                        return
                    }
                    case 0x1: {
                        this.#v[ir.X] |= this.#v[ir.Y]
                        return
                    }
                    case 0x2: {
                        this.#v[ir.X] &= this.#v[ir.Y]
                        return
                    }
                    case 0x3: {
                        this.#v[ir.X] ^= this.#v[ir.Y]
                        return
                    }
                    case 0x4: {
                        const n = this.#v[ir.X] + this.#v[ir.Y]
                        this.#v[0xf] = (this.#v[ir.X] = n & 0xff) === n ? 0 : 1
                        return
                    }
                    case 0x5: {
                        const n = this.#v[ir.X] - this.#v[ir.Y]
                        this.#v[0xf] = (this.#v[ir.X] = n & 0xff) === n ? 1 : 0
                        return
                    }
                    case 0x6: {
                        this.#v[0xf] = this.#v[ir.X] & 0x1
                        this.#v[ir.X] >>= 1
                        return
                    }
                }
            }
            case 0xa0_00: {
                this.#i = ir.NNN
                return
            }
            case 0xd0_00: {
                const x = this.#v[ir.X]
                const y = this.#v[ir.Y]
                const height = ir.N
                for (let i = 0; i < height; i++) {
                    const px = this.#memory[this.#i + i]
                    for (let j = 0; j < 8; j++) {
                        if (px & (0b1000_0000 >> j) && this.#screen.xor(x + j, y + i)) {
                            this.#v[0xf] = 1
                        }
                    }
                }
                return
            }
        }
        throw new Error(`Unknown opcode ${ir.raw.toString(16)}`)
    }
    get debug() {
        return {
            pc: this.#pc,
            v: this.#v,
            i: this.#i,
            stack: this.#stack,
            memory: this.#memory,
        }
    }
}

export class IR {
    #raw: number
    constructor(raw: number) {
        this.#raw = raw
    }
    get NNN() {
        return this.#raw & 0x0f_ff
    }
    get NN() {
        return this.#raw & 0x00_ff
    }
    get N() {
        return this.#raw & 0x00_0f
    }
    get X() {
        return (this.#raw & 0x0f_00) >> 8
    }
    get Y() {
        return (this.#raw & 0x00_f0) >> 4
    }
    get type() {
        return this.#raw & 0xf0_00
    }
    get raw() {
        return this.#raw
    }
}

export class ScreenBuffer {
    #set = new Set<string>()
    xor(x: number, y: number) {
        const pos = `${x},${y}`
        const collision = this.#set.has(pos)
        if (collision) {
            this.#set.delete(pos)
        } else {
            this.#set.add(pos)
        }
        return collision
    }
    clear() {
        this.#set.clear()
    }
    *[Symbol.iterator]() {
        for (const pos of this.#set) {
            yield pos.split(',').map(Number)
        }
    }
}

export class Renderer {
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
        for (const [x, y] of this.#buffer) {
            ctx.fillRect(x * Renderer.SCALE, y * Renderer.SCALE, Renderer.SCALE - 1, Renderer.SCALE - 1)
        }
    }
}
