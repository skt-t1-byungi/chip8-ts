import fs from 'node:fs'
import path from 'node:path'
import cp from 'node:child_process'

const ROMS_DIR = `${__dirname}/../roms`
const DIST_PATH = `${__dirname}/../src/loadRom.ts`

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
    `
    export const ROMS = [${roms.map(r => JSON.stringify(r.name)).join(', ')}] as const;
    export default function loadRom(name: typeof ROMS[number]) {
        switch (name) {
            ${roms
                .map(
                    ({ name, path }) => `case '${name}': 
            // @ts-ignore
            return import('data-url:${path}').then(fetch).then(r => r.arrayBuffer()).then(b => new Uint8Array(b))`,
                )
                .join('\n')}
            default: throw new Error('Unknown ROM')
        }
    }`,
)
cp.execSync(`npx prettier --write ${DIST_PATH}`)
console.log('Done!')
