active = false;
settings = document.getElementById("settings");
recorded = document.getElementById("recorded");
scripted = document.getElementById("scripted");
out = document.getElementById("out");

inputpicker = document.getElementById("inputpicker");
inputpicker.onchange = async function(e) {
    console.log("Changed.", e);

    // Feature detection
    if(!inputpicker.files[0].text) {
        // Browser does not support getting text from the file. 
        // Probably it also doesn't support Optional Chaining (?.)
        // Adding support for older workarounds would make our code messy. Show user a message.
        alert("Your browser does not support the newest technologies needed for this website. Sorry about that.\nTry using a different and updated browser.");
    }
    
    infile = await inputpicker.files[0].text();

    parse();
}


filehead = `#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
Esc::ExitApp
^m::

`; // Ctrl + M starts the script; Esc stops the script

parsed = []; 

function convert() {
    text = scripted.value;
    lastTimestamp = parsed[0].timestamp;
    output = "";

    output += filehead;

    for(i = 0; i < Math.min(parsed.length, text.length); i++) {
        output += ("Sleep, " + (parsed[i].timestamp - lastTimestamp) + "\n");
        output += ("Send, " + text[i].replace(" ", "{Space}").replace("↵", "{Enter}") + "\n");

        lastTimestamp = parsed[i].timestamp;
    }

    out.value = output;


}

function parse() {

    textToAppear = "<span>";
    lastTimestamp = 0;
    timeDifference = 5000; // Show parts of text in different colours if time difference is greater than that [ms]
    backgroundColours = ["af84e8", "52dccf", "eac658"];
    /* parse the JSON file */
    typed = JSON.parse(infile);

    b = 0; 
    for(a of typed) {
        if(a.type == "keydown" && (a.key.length == 1 || a.key == "Enter")) {
            // We ignore special keys but Enter.
            //console.log(a);
            textToAppear += a.key.replace("Enter", "↵");

            if(a.timestamp > (lastTimestamp + timeDifference)) {
                textToAppear += `</span><span style="background-color: #${backgroundColours[b++%backgroundColours.length]};">`;
            }

            lastTimestamp = a.timestamp;
            parsed.push(a);

            // #${Math.min(999999, (Math.round(Math.random() * 1000000) + "111111").slice(0, 6))};
        }
    }

    recorded.innerHTML = textToAppear;

    // Change Enter/Return to ↵
    // 
}


// Invoke download https://stackoverflow.com/a/33542499
save = function(filename, data) {
    var blob = new Blob([data], {type: 'application/json'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}