
# CHIP-8 Emulator (Unix)

A minimal **CHIP-8 Emulator** written for Unix based systems. This project follows the classic CHIP-8 specification.

> Technically, this is an interpreter rather than a hardware emulator, since CHIP-8 is a virtual instruction set.

---

## Features

- Complete **CHIP-8 instruction set**
- 4 KB memory model (programs loaded at address `0x200`)
- Built-in hexadecimal **font sprites** (4×5)
- 64×32 monochrome display
- Stack-based subroutine handling
- Delay and sound timers running at 60 Hz
- Hex keypad input mapping
- Fetch / Decode / Execute execution loop
- Designed and tested on **Unix (Linux)** systems

---

## Usage

The emulator uses the SDL2 development package installed in Linux/WSL.
`Buildfile` obtains the system SDL2 include and linker flags with `pkg-config`.

Install the development dependencies in Ubuntu/WSL, then build from this directory:

```sh
sudo apt-get update
sudo apt-get install build-essential libsdl2-dev pkg-config
cbuild --sequential -f Buildfile
# Or use GNU make:
make -f Buildfile -j4
```

SDL2 headers and the shared library are supplied by the system package;
SDL2 sources and binaries are not vendored in this project. A graphical
Linux/WSLg session is needed to display the emulator window.

The default target builds the program without launching it. Run the emulator
with a ROM path:

```sh
./dist/main programs/pong.ch8
# Or use GNU make's run target:
make -f Buildfile run ROM=programs/pong.ch8
```

## Author
Yağız Erdem <br/>
yagizerdem819@gmail.com

## License
MIT License
