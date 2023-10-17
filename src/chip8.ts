// CHIP-8 emulator

export class CPU {
    #memory = new Uint8Array(4096)
    #pc = 0x200
    #v = new Uint8Array(16)
    #i = 0
    #stack = new Uint16Array(16)
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
                if (ir.NNN === 0x00_e0) {
                    this.#screen.clear()
                }
                break
            }
            case 0x60_00: {
                this.#v[ir.X] = ir.NN
                break
            }
            case 0x70_00: {
                this.#v[ir.X] += ir.NN
                break
            }
            case 0xa0_00: {
                this.#i = ir.NNN
                break
            }
            case 0xd0_00: {
                const x = this.#v[ir.X]
                const y = this.#v[ir.Y]
                const height = ir.N
                for (let i = 0; i < height; i++) {
                    const unit = this.#memory[this.#i + i]
                    console.log('draw', x, y, height, this.#i, i, unit.toString(2).padStart(8, '0'))
                    for (let j = 0; j < 8; j++) {
                        if (unit & (0b1000_0000 >> j) && this.#screen.xor(x + j, y + i)) {
                            this.#v[0xf] = 1
                        }
                    }
                }
                break
            }
            default:
                throw new Error(`Unknown opcode(${ir}) or not implemented`)
        }
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
