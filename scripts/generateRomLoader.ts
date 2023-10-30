import fs from 'node:fs'
import path from 'node:path'
import prettier from 'prettier'

const ROMS_DIR = `${__dirname}/../roms`
const DIST_PATH = `${__dirname}/../src/loadRom.ts`

async function main() {
    const roms = fs
        .readdirSync(ROMS_DIR)
        .filter(f => f.endsWith('.ch8'))
        .map(name => ({
            name,
            path: path.relative(path.dirname(DIST_PATH), `${ROMS_DIR}/${name}`),
        }))
    console.log(`Found "${roms.length}" ROMs`)

    fs.writeFileSync(
        DIST_PATH,
        await prettier.format(
            `
    export const ROMS = [${roms.map(r => JSON.stringify(r.name)).join(', ')}] as const;
    export default function loadRom(name: typeof ROMS[number]) {
        switch (name) {
            ${roms
                .map(
                    ({ name, path }) => `case '${name}': 
            // @ts-ignore
            return import('data-url:${path}').then(toUint8Array)`,
                )
                .join('\n')}
            default: throw new Error('Unknown ROM')
        }
    }
    function toUint8Array(data: string) {
        return fetch(data).then(r => r.arrayBuffer()).then(b => new Uint8Array(b))
    }
    `,
            {
                parser: 'typescript',
                ...(await prettier.resolveConfig(DIST_PATH)),
            },
        ),
    )
    console.log('Done!')
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
