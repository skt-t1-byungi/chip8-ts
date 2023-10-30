export const ROMS = [
    '15 Puzzle [Roger Ivie] (alt).ch8',
    '15 Puzzle [Roger Ivie].ch8',
    'Addition Problems [Paul C. Moews].ch8',
    'Airplane.ch8',
    'Animal Race [Brian Astle].ch8',
    'Astro Dodge Hires [Revival Studios, 2008].ch8',
    'Astro Dodge [Revival Studios, 2008].ch8',
    'BMP Viewer - Hello (C8 example) [Hap, 2005].ch8',
    'Biorhythm [Jef Winsor].ch8',
    'Blinky [Hans Christian Egeberg, 1991].ch8',
    'Blinky [Hans Christian Egeberg] (alt).ch8',
    'Blitz [David Winter].ch8',
    'Bowling [Gooitzen van der Wal].ch8',
    'Breakout (Brix hack) [David Winter, 1997].ch8',
    'Breakout [Carmelo Cortez, 1979].ch8',
    'Brick (Brix hack, 1990).ch8',
    'Brix [Andreas Gustafsson, 1990].ch8',
    'Cave.ch8',
    'Chip8 Picture.ch8',
    'Chip8 emulator Logo [Garstyciuks].ch8',
    'Clock Program [Bill Fisher, 1981].ch8',
    'Coin Flipping [Carmelo Cortez, 1978].ch8',
    'Connect 4 [David Winter].ch8',
    'Craps [Camerlo Cortez, 1978].ch8',
    'Deflection [John Fort].ch8',
    'Delay Timer Test [Matthew Mikolay, 2010].ch8',
    'Division Test [Sergey Naydenov, 2010].ch8',
    'Figures.ch8',
    'Filter.ch8',
    'Fishie [Hap, 2005].ch8',
    'Framed MK1 [GV Samways, 1980].ch8',
    'Framed MK2 [GV Samways, 1980].ch8',
    'Guess [David Winter] (alt).ch8',
    'Guess [David Winter].ch8',
    'Hi-Lo [Jef Winsor, 1978].ch8',
    'Hidden [David Winter, 1996].ch8',
    'Hires Maze [David Winter, 199x].ch8',
    'Hires Particle Demo [zeroZshadow, 2008].ch8',
    'Hires Sierpinski [Sergey Naydenov, 2010].ch8',
    'Hires Stars [Sergey Naydenov, 2010].ch8',
    'Hires Test [Tom Swan, 1979].ch8',
    'Hires Worm V4 [RB-Revival Studios, 2007].ch8',
    'IBM Logo.ch8',
    'Jumping X and O [Harry Kleinberg, 1977].ch8',
    'Kaleidoscope [Joseph Weisbecker, 1978].ch8',
    'Keypad Test [Hap, 2006].ch8',
    'Landing.ch8',
    'Life [GV Samways, 1980].ch8',
    'Lunar Lander (Udo Pernisz, 1979).ch8',
    'Mastermind FourRow (Robert Lindley, 1978).ch8',
    'Maze (alt) [David Winter, 199x].ch8',
    'Maze [David Winter, 199x].ch8',
    'Merlin [David Winter].ch8',
    'Minimal game [Revival Studios, 2007].ch8',
    'Missile [David Winter].ch8',
    'Most Dangerous Game [Peter Maruhnic].ch8',
    'Nim [Carmelo Cortez, 1978].ch8',
    'Paddles.ch8',
    'Particle Demo [zeroZshadow, 2008].ch8',
    'Pong (1 player).ch8',
    'Pong (alt).ch8',
    'Pong 2 (Pong hack) [David Winter, 1997].ch8',
    'Pong [Paul Vervalin, 1990].ch8',
    'Programmable Spacefighters [Jef Winsor].ch8',
    'Puzzle.ch8',
    'Random Number Test [Matthew Mikolay, 2010].ch8',
    'Reversi [Philip Baltzer].ch8',
    'Rocket Launch [Jonas Lindstedt].ch8',
    'Rocket Launcher.ch8',
    'Rocket [Joseph Weisbecker, 1978].ch8',
    'Rush Hour [Hap, 2006] (alt).ch8',
    'Rush Hour [Hap, 2006].ch8',
    'Russian Roulette [Carmelo Cortez, 1978].ch8',
    'SQRT Test [Sergey Naydenov, 2010].ch8',
    'Sequence Shoot [Joyce Weisbecker].ch8',
    'Shooting Stars [Philip Baltzer, 1978].ch8',
    'Sierpinski [Sergey Naydenov, 2010].ch8',
    'Sirpinski [Sergey Naydenov, 2010].ch8',
    'Slide [Joyce Weisbecker].ch8',
    'Soccer.ch8',
    'Space Flight.ch8',
    'Space Intercept [Joseph Weisbecker, 1978].ch8',
    'Space Invaders [David Winter] (alt).ch8',
    'Space Invaders [David Winter].ch8',
    'Spooky Spot [Joseph Weisbecker, 1978].ch8',
    'Squash [David Winter].ch8',
    'Stars [Sergey Naydenov, 2010].ch8',
    'Submarine [Carmelo Cortez, 1978].ch8',
    'Sum Fun [Joyce Weisbecker].ch8',
    'Syzygy [Roy Trevino, 1990].ch8',
    'Tank.ch8',
    'Tapeworm [JDR, 1999].ch8',
    'Tetris [Fran Dachille, 1991].ch8',
    'Tic-Tac-Toe [David Winter].ch8',
    'Timebomb.ch8',
    'Trip8 Demo (2008) [Revival Studios].ch8',
    'Trip8 Hires Demo (2008) [Revival Studios].ch8',
    'Tron.ch8',
    'UFO [Lutz V, 1992].ch8',
    'Vers [JMN, 1991].ch8',
    'Vertical Brix [Paul Robson, 1996].ch8',
    'Wall [David Winter].ch8',
    'Wipe Off [Joseph Weisbecker].ch8',
    'Worm V4 [RB-Revival Studios, 2007].ch8',
    'X-Mirror.ch8',
    'Zero Demo [zeroZshadow, 2007].ch8',
    'ZeroPong [zeroZshadow, 2007].ch8',
] as const
export default function loadRom(name: (typeof ROMS)[number]) {
    switch (name) {
        case '15 Puzzle [Roger Ivie] (alt).ch8':
            // @ts-ignore
            return import('data-url:../roms/15 Puzzle [Roger Ivie] (alt).ch8').then(toUint8Array)
        case '15 Puzzle [Roger Ivie].ch8':
            // @ts-ignore
            return import('data-url:../roms/15 Puzzle [Roger Ivie].ch8').then(toUint8Array)
        case 'Addition Problems [Paul C. Moews].ch8':
            // @ts-ignore
            return import('data-url:../roms/Addition Problems [Paul C. Moews].ch8').then(toUint8Array)
        case 'Airplane.ch8':
            // @ts-ignore
            return import('data-url:../roms/Airplane.ch8').then(toUint8Array)
        case 'Animal Race [Brian Astle].ch8':
            // @ts-ignore
            return import('data-url:../roms/Animal Race [Brian Astle].ch8').then(toUint8Array)
        case 'Astro Dodge Hires [Revival Studios, 2008].ch8':
            // @ts-ignore
            return import('data-url:../roms/Astro Dodge Hires [Revival Studios, 2008].ch8').then(toUint8Array)
        case 'Astro Dodge [Revival Studios, 2008].ch8':
            // @ts-ignore
            return import('data-url:../roms/Astro Dodge [Revival Studios, 2008].ch8').then(toUint8Array)
        case 'BMP Viewer - Hello (C8 example) [Hap, 2005].ch8':
            // @ts-ignore
            return import('data-url:../roms/BMP Viewer - Hello (C8 example) [Hap, 2005].ch8').then(toUint8Array)
        case 'Biorhythm [Jef Winsor].ch8':
            // @ts-ignore
            return import('data-url:../roms/Biorhythm [Jef Winsor].ch8').then(toUint8Array)
        case 'Blinky [Hans Christian Egeberg, 1991].ch8':
            // @ts-ignore
            return import('data-url:../roms/Blinky [Hans Christian Egeberg, 1991].ch8').then(toUint8Array)
        case 'Blinky [Hans Christian Egeberg] (alt).ch8':
            // @ts-ignore
            return import('data-url:../roms/Blinky [Hans Christian Egeberg] (alt).ch8').then(toUint8Array)
        case 'Blitz [David Winter].ch8':
            // @ts-ignore
            return import('data-url:../roms/Blitz [David Winter].ch8').then(toUint8Array)
        case 'Bowling [Gooitzen van der Wal].ch8':
            // @ts-ignore
            return import('data-url:../roms/Bowling [Gooitzen van der Wal].ch8').then(toUint8Array)
        case 'Breakout (Brix hack) [David Winter, 1997].ch8':
            // @ts-ignore
            return import('data-url:../roms/Breakout (Brix hack) [David Winter, 1997].ch8').then(toUint8Array)
        case 'Breakout [Carmelo Cortez, 1979].ch8':
            // @ts-ignore
            return import('data-url:../roms/Breakout [Carmelo Cortez, 1979].ch8').then(toUint8Array)
        case 'Brick (Brix hack, 1990).ch8':
            // @ts-ignore
            return import('data-url:../roms/Brick (Brix hack, 1990).ch8').then(toUint8Array)
        case 'Brix [Andreas Gustafsson, 1990].ch8':
            // @ts-ignore
            return import('data-url:../roms/Brix [Andreas Gustafsson, 1990].ch8').then(toUint8Array)
        case 'Cave.ch8':
            // @ts-ignore
            return import('data-url:../roms/Cave.ch8').then(toUint8Array)
        case 'Chip8 Picture.ch8':
            // @ts-ignore
            return import('data-url:../roms/Chip8 Picture.ch8').then(toUint8Array)
        case 'Chip8 emulator Logo [Garstyciuks].ch8':
            // @ts-ignore
            return import('data-url:../roms/Chip8 emulator Logo [Garstyciuks].ch8').then(toUint8Array)
        case 'Clock Program [Bill Fisher, 1981].ch8':
            // @ts-ignore
            return import('data-url:../roms/Clock Program [Bill Fisher, 1981].ch8').then(toUint8Array)
        case 'Coin Flipping [Carmelo Cortez, 1978].ch8':
            // @ts-ignore
            return import('data-url:../roms/Coin Flipping [Carmelo Cortez, 1978].ch8').then(toUint8Array)
        case 'Connect 4 [David Winter].ch8':
            // @ts-ignore
            return import('data-url:../roms/Connect 4 [David Winter].ch8').then(toUint8Array)
        case 'Craps [Camerlo Cortez, 1978].ch8':
            // @ts-ignore
            return import('data-url:../roms/Craps [Camerlo Cortez, 1978].ch8').then(toUint8Array)
        case 'Deflection [John Fort].ch8':
            // @ts-ignore
            return import('data-url:../roms/Deflection [John Fort].ch8').then(toUint8Array)
        case 'Delay Timer Test [Matthew Mikolay, 2010].ch8':
            // @ts-ignore
            return import('data-url:../roms/Delay Timer Test [Matthew Mikolay, 2010].ch8').then(toUint8Array)
        case 'Division Test [Sergey Naydenov, 2010].ch8':
            // @ts-ignore
            return import('data-url:../roms/Division Test [Sergey Naydenov, 2010].ch8').then(toUint8Array)
        case 'Figures.ch8':
            // @ts-ignore
            return import('data-url:../roms/Figures.ch8').then(toUint8Array)
        case 'Filter.ch8':
            // @ts-ignore
            return import('data-url:../roms/Filter.ch8').then(toUint8Array)
        case 'Fishie [Hap, 2005].ch8':
            // @ts-ignore
            return import('data-url:../roms/Fishie [Hap, 2005].ch8').then(toUint8Array)
        case 'Framed MK1 [GV Samways, 1980].ch8':
            // @ts-ignore
            return import('data-url:../roms/Framed MK1 [GV Samways, 1980].ch8').then(toUint8Array)
        case 'Framed MK2 [GV Samways, 1980].ch8':
            // @ts-ignore
            return import('data-url:../roms/Framed MK2 [GV Samways, 1980].ch8').then(toUint8Array)
        case 'Guess [David Winter] (alt).ch8':
            // @ts-ignore
            return import('data-url:../roms/Guess [David Winter] (alt).ch8').then(toUint8Array)
        case 'Guess [David Winter].ch8':
            // @ts-ignore
            return import('data-url:../roms/Guess [David Winter].ch8').then(toUint8Array)
        case 'Hi-Lo [Jef Winsor, 1978].ch8':
            // @ts-ignore
            return import('data-url:../roms/Hi-Lo [Jef Winsor, 1978].ch8').then(toUint8Array)
        case 'Hidden [David Winter, 1996].ch8':
            // @ts-ignore
            return import('data-url:../roms/Hidden [David Winter, 1996].ch8').then(toUint8Array)
        case 'Hires Maze [David Winter, 199x].ch8':
            // @ts-ignore
            return import('data-url:../roms/Hires Maze [David Winter, 199x].ch8').then(toUint8Array)
        case 'Hires Particle Demo [zeroZshadow, 2008].ch8':
            // @ts-ignore
            return import('data-url:../roms/Hires Particle Demo [zeroZshadow, 2008].ch8').then(toUint8Array)
        case 'Hires Sierpinski [Sergey Naydenov, 2010].ch8':
            // @ts-ignore
            return import('data-url:../roms/Hires Sierpinski [Sergey Naydenov, 2010].ch8').then(toUint8Array)
        case 'Hires Stars [Sergey Naydenov, 2010].ch8':
            // @ts-ignore
            return import('data-url:../roms/Hires Stars [Sergey Naydenov, 2010].ch8').then(toUint8Array)
        case 'Hires Test [Tom Swan, 1979].ch8':
            // @ts-ignore
            return import('data-url:../roms/Hires Test [Tom Swan, 1979].ch8').then(toUint8Array)
        case 'Hires Worm V4 [RB-Revival Studios, 2007].ch8':
            // @ts-ignore
            return import('data-url:../roms/Hires Worm V4 [RB-Revival Studios, 2007].ch8').then(toUint8Array)
        case 'IBM Logo.ch8':
            // @ts-ignore
            return import('data-url:../roms/IBM Logo.ch8').then(toUint8Array)
        case 'Jumping X and O [Harry Kleinberg, 1977].ch8':
            // @ts-ignore
            return import('data-url:../roms/Jumping X and O [Harry Kleinberg, 1977].ch8').then(toUint8Array)
        case 'Kaleidoscope [Joseph Weisbecker, 1978].ch8':
            // @ts-ignore
            return import('data-url:../roms/Kaleidoscope [Joseph Weisbecker, 1978].ch8').then(toUint8Array)
        case 'Keypad Test [Hap, 2006].ch8':
            // @ts-ignore
            return import('data-url:../roms/Keypad Test [Hap, 2006].ch8').then(toUint8Array)
        case 'Landing.ch8':
            // @ts-ignore
            return import('data-url:../roms/Landing.ch8').then(toUint8Array)
        case 'Life [GV Samways, 1980].ch8':
            // @ts-ignore
            return import('data-url:../roms/Life [GV Samways, 1980].ch8').then(toUint8Array)
        case 'Lunar Lander (Udo Pernisz, 1979).ch8':
            // @ts-ignore
            return import('data-url:../roms/Lunar Lander (Udo Pernisz, 1979).ch8').then(toUint8Array)
        case 'Mastermind FourRow (Robert Lindley, 1978).ch8':
            // @ts-ignore
            return import('data-url:../roms/Mastermind FourRow (Robert Lindley, 1978).ch8').then(toUint8Array)
        case 'Maze (alt) [David Winter, 199x].ch8':
            // @ts-ignore
            return import('data-url:../roms/Maze (alt) [David Winter, 199x].ch8').then(toUint8Array)
        case 'Maze [David Winter, 199x].ch8':
            // @ts-ignore
            return import('data-url:../roms/Maze [David Winter, 199x].ch8').then(toUint8Array)
        case 'Merlin [David Winter].ch8':
            // @ts-ignore
            return import('data-url:../roms/Merlin [David Winter].ch8').then(toUint8Array)
        case 'Minimal game [Revival Studios, 2007].ch8':
            // @ts-ignore
            return import('data-url:../roms/Minimal game [Revival Studios, 2007].ch8').then(toUint8Array)
        case 'Missile [David Winter].ch8':
            // @ts-ignore
            return import('data-url:../roms/Missile [David Winter].ch8').then(toUint8Array)
        case 'Most Dangerous Game [Peter Maruhnic].ch8':
            // @ts-ignore
            return import('data-url:../roms/Most Dangerous Game [Peter Maruhnic].ch8').then(toUint8Array)
        case 'Nim [Carmelo Cortez, 1978].ch8':
            // @ts-ignore
            return import('data-url:../roms/Nim [Carmelo Cortez, 1978].ch8').then(toUint8Array)
        case 'Paddles.ch8':
            // @ts-ignore
            return import('data-url:../roms/Paddles.ch8').then(toUint8Array)
        case 'Particle Demo [zeroZshadow, 2008].ch8':
            // @ts-ignore
            return import('data-url:../roms/Particle Demo [zeroZshadow, 2008].ch8').then(toUint8Array)
        case 'Pong (1 player).ch8':
            // @ts-ignore
            return import('data-url:../roms/Pong (1 player).ch8').then(toUint8Array)
        case 'Pong (alt).ch8':
            // @ts-ignore
            return import('data-url:../roms/Pong (alt).ch8').then(toUint8Array)
        case 'Pong 2 (Pong hack) [David Winter, 1997].ch8':
            // @ts-ignore
            return import('data-url:../roms/Pong 2 (Pong hack) [David Winter, 1997].ch8').then(toUint8Array)
        case 'Pong [Paul Vervalin, 1990].ch8':
            // @ts-ignore
            return import('data-url:../roms/Pong [Paul Vervalin, 1990].ch8').then(toUint8Array)
        case 'Programmable Spacefighters [Jef Winsor].ch8':
            // @ts-ignore
            return import('data-url:../roms/Programmable Spacefighters [Jef Winsor].ch8').then(toUint8Array)
        case 'Puzzle.ch8':
            // @ts-ignore
            return import('data-url:../roms/Puzzle.ch8').then(toUint8Array)
        case 'Random Number Test [Matthew Mikolay, 2010].ch8':
            // @ts-ignore
            return import('data-url:../roms/Random Number Test [Matthew Mikolay, 2010].ch8').then(toUint8Array)
        case 'Reversi [Philip Baltzer].ch8':
            // @ts-ignore
            return import('data-url:../roms/Reversi [Philip Baltzer].ch8').then(toUint8Array)
        case 'Rocket Launch [Jonas Lindstedt].ch8':
            // @ts-ignore
            return import('data-url:../roms/Rocket Launch [Jonas Lindstedt].ch8').then(toUint8Array)
        case 'Rocket Launcher.ch8':
            // @ts-ignore
            return import('data-url:../roms/Rocket Launcher.ch8').then(toUint8Array)
        case 'Rocket [Joseph Weisbecker, 1978].ch8':
            // @ts-ignore
            return import('data-url:../roms/Rocket [Joseph Weisbecker, 1978].ch8').then(toUint8Array)
        case 'Rush Hour [Hap, 2006] (alt).ch8':
            // @ts-ignore
            return import('data-url:../roms/Rush Hour [Hap, 2006] (alt).ch8').then(toUint8Array)
        case 'Rush Hour [Hap, 2006].ch8':
            // @ts-ignore
            return import('data-url:../roms/Rush Hour [Hap, 2006].ch8').then(toUint8Array)
        case 'Russian Roulette [Carmelo Cortez, 1978].ch8':
            // @ts-ignore
            return import('data-url:../roms/Russian Roulette [Carmelo Cortez, 1978].ch8').then(toUint8Array)
        case 'SQRT Test [Sergey Naydenov, 2010].ch8':
            // @ts-ignore
            return import('data-url:../roms/SQRT Test [Sergey Naydenov, 2010].ch8').then(toUint8Array)
        case 'Sequence Shoot [Joyce Weisbecker].ch8':
            // @ts-ignore
            return import('data-url:../roms/Sequence Shoot [Joyce Weisbecker].ch8').then(toUint8Array)
        case 'Shooting Stars [Philip Baltzer, 1978].ch8':
            // @ts-ignore
            return import('data-url:../roms/Shooting Stars [Philip Baltzer, 1978].ch8').then(toUint8Array)
        case 'Sierpinski [Sergey Naydenov, 2010].ch8':
            // @ts-ignore
            return import('data-url:../roms/Sierpinski [Sergey Naydenov, 2010].ch8').then(toUint8Array)
        case 'Sirpinski [Sergey Naydenov, 2010].ch8':
            // @ts-ignore
            return import('data-url:../roms/Sirpinski [Sergey Naydenov, 2010].ch8').then(toUint8Array)
        case 'Slide [Joyce Weisbecker].ch8':
            // @ts-ignore
            return import('data-url:../roms/Slide [Joyce Weisbecker].ch8').then(toUint8Array)
        case 'Soccer.ch8':
            // @ts-ignore
            return import('data-url:../roms/Soccer.ch8').then(toUint8Array)
        case 'Space Flight.ch8':
            // @ts-ignore
            return import('data-url:../roms/Space Flight.ch8').then(toUint8Array)
        case 'Space Intercept [Joseph Weisbecker, 1978].ch8':
            // @ts-ignore
            return import('data-url:../roms/Space Intercept [Joseph Weisbecker, 1978].ch8').then(toUint8Array)
        case 'Space Invaders [David Winter] (alt).ch8':
            // @ts-ignore
            return import('data-url:../roms/Space Invaders [David Winter] (alt).ch8').then(toUint8Array)
        case 'Space Invaders [David Winter].ch8':
            // @ts-ignore
            return import('data-url:../roms/Space Invaders [David Winter].ch8').then(toUint8Array)
        case 'Spooky Spot [Joseph Weisbecker, 1978].ch8':
            // @ts-ignore
            return import('data-url:../roms/Spooky Spot [Joseph Weisbecker, 1978].ch8').then(toUint8Array)
        case 'Squash [David Winter].ch8':
            // @ts-ignore
            return import('data-url:../roms/Squash [David Winter].ch8').then(toUint8Array)
        case 'Stars [Sergey Naydenov, 2010].ch8':
            // @ts-ignore
            return import('data-url:../roms/Stars [Sergey Naydenov, 2010].ch8').then(toUint8Array)
        case 'Submarine [Carmelo Cortez, 1978].ch8':
            // @ts-ignore
            return import('data-url:../roms/Submarine [Carmelo Cortez, 1978].ch8').then(toUint8Array)
        case 'Sum Fun [Joyce Weisbecker].ch8':
            // @ts-ignore
            return import('data-url:../roms/Sum Fun [Joyce Weisbecker].ch8').then(toUint8Array)
        case 'Syzygy [Roy Trevino, 1990].ch8':
            // @ts-ignore
            return import('data-url:../roms/Syzygy [Roy Trevino, 1990].ch8').then(toUint8Array)
        case 'Tank.ch8':
            // @ts-ignore
            return import('data-url:../roms/Tank.ch8').then(toUint8Array)
        case 'Tapeworm [JDR, 1999].ch8':
            // @ts-ignore
            return import('data-url:../roms/Tapeworm [JDR, 1999].ch8').then(toUint8Array)
        case 'Tetris [Fran Dachille, 1991].ch8':
            // @ts-ignore
            return import('data-url:../roms/Tetris [Fran Dachille, 1991].ch8').then(toUint8Array)
        case 'Tic-Tac-Toe [David Winter].ch8':
            // @ts-ignore
            return import('data-url:../roms/Tic-Tac-Toe [David Winter].ch8').then(toUint8Array)
        case 'Timebomb.ch8':
            // @ts-ignore
            return import('data-url:../roms/Timebomb.ch8').then(toUint8Array)
        case 'Trip8 Demo (2008) [Revival Studios].ch8':
            // @ts-ignore
            return import('data-url:../roms/Trip8 Demo (2008) [Revival Studios].ch8').then(toUint8Array)
        case 'Trip8 Hires Demo (2008) [Revival Studios].ch8':
            // @ts-ignore
            return import('data-url:../roms/Trip8 Hires Demo (2008) [Revival Studios].ch8').then(toUint8Array)
        case 'Tron.ch8':
            // @ts-ignore
            return import('data-url:../roms/Tron.ch8').then(toUint8Array)
        case 'UFO [Lutz V, 1992].ch8':
            // @ts-ignore
            return import('data-url:../roms/UFO [Lutz V, 1992].ch8').then(toUint8Array)
        case 'Vers [JMN, 1991].ch8':
            // @ts-ignore
            return import('data-url:../roms/Vers [JMN, 1991].ch8').then(toUint8Array)
        case 'Vertical Brix [Paul Robson, 1996].ch8':
            // @ts-ignore
            return import('data-url:../roms/Vertical Brix [Paul Robson, 1996].ch8').then(toUint8Array)
        case 'Wall [David Winter].ch8':
            // @ts-ignore
            return import('data-url:../roms/Wall [David Winter].ch8').then(toUint8Array)
        case 'Wipe Off [Joseph Weisbecker].ch8':
            // @ts-ignore
            return import('data-url:../roms/Wipe Off [Joseph Weisbecker].ch8').then(toUint8Array)
        case 'Worm V4 [RB-Revival Studios, 2007].ch8':
            // @ts-ignore
            return import('data-url:../roms/Worm V4 [RB-Revival Studios, 2007].ch8').then(toUint8Array)
        case 'X-Mirror.ch8':
            // @ts-ignore
            return import('data-url:../roms/X-Mirror.ch8').then(toUint8Array)
        case 'Zero Demo [zeroZshadow, 2007].ch8':
            // @ts-ignore
            return import('data-url:../roms/Zero Demo [zeroZshadow, 2007].ch8').then(toUint8Array)
        case 'ZeroPong [zeroZshadow, 2007].ch8':
            // @ts-ignore
            return import('data-url:../roms/ZeroPong [zeroZshadow, 2007].ch8').then(toUint8Array)
        default:
            throw new Error('Unknown ROM')
    }
}
function toUint8Array(data: string) {
    return fetch(data)
        .then(r => r.arrayBuffer())
        .then(b => new Uint8Array(b))
}
