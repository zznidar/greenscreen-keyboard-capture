# greenscreen-keyboard-capture
Capture all key presses while displaying a green screen. Useful for recording scenes where a person is looking at the screen and screen content is not yet known/determined.

## What is this?
Sometimes when filming a movie, a computer screen is visible in the shot. However, oftentimes the content of the screen is not yet known or determined or just the reflections are making it hard to see the screen content. At such occasions, displaying a green screen is often a solution. 

But what happens when the actor is typing on the keyboard? If green screen is displayed, it is hard to re-create the key presses afterwards -- especially to get the correct timings. (Surely it is too time-consuming to listen to keyboard sounds frame by frame ...)

This tool captures all key presses (keydown and keyup) and exports that data as json, which can then be imported into _this tool (under construction)_ to parse out timestamps and get out a .ahk file, which sends keystrokes with correct timings. 

At the end, you can create a screen recording where letters show up at just the right time.