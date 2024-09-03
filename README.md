# greenscreen-keyboard-capture
Capture all key presses while displaying a green screen. Useful for recording scenes where a person is looking at the screen and screen content is not yet known/determined.

## What is this?
Sometimes when filming a movie, a computer screen is visible in the shot. However, oftentimes the content of the screen is not yet known or determined or just the reflections are making it hard to see the screen content. At such occasions, displaying a green screen is often a solution. 

But what happens when the actor is typing on the keyboard? If green screen is displayed, it is hard to re-create the key presses afterwards -- especially to get the correct timings. (Surely it is too time-consuming to listen to keyboard sounds frame by frame ...)

This tool captures all key presses (keydown and keyup) and exports that data as json, which can then be imported into _this tool (under construction)_ to parse out timestamps and get out a .ahk file, which sends keystrokes with correct timings. 

At the end, you can create a screen recording where letters show up at just the right time.

## Usage
1. Open https://zznidar.github.io/greenscreen-keyboard-capture/index.html
2. Enter full-screen mode (F11)
3. Choose your favourite colour (actually, ask your filming crew which colour of green-screen is the easiest to replace in post-production!)
4. Triple-click anywhere on the page to start capturing
5. Record your movie with typing on the keyboard
6. Tripple-click to stop recording and download a .JSON file with your typed letters.

Now, you have a file of the keys you pressed, but more importantly, their timestamps!
To get a .ahk AutoHotKey script, do the following:
1. Open https://zznidar.github.io/greenscreen-keyboard-capture/parser.html
2. Select the JSON file
3. Enter the text you want to actually appear on screen
4. Press `Convert`
5. AHK script will be downloaded to your computer. Double-click it to run.
6. Start your screen recording, then press `Ctrl` + `M` to start auto-typing
    * Should anything go wrong, press `Esc` to stop the script

