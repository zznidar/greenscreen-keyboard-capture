active = false;
settings = document.getElementById("settings");

function changebackground(colour) {
    document.documentElement.style.backgroundColor = colour;
}

function pressed(e) {
    console.log(e.type, e.key, Date.now());
    keys.push({"type": e.type, "key": e.key, "timestamp": Date.now()});
}




window.addEventListener('click', function(e) {
    if (e.detail == 3) {
        if(!active) {
            alert("Capturing started. Background set to green. Mouse pointer hidden. To stop, tripple-click anywhere on this webpage.");
            active = true;
            // Show greenscreen and start capturing
            // Clear keys array, but only when starting capturing (not at the end!)
            document.documentElement.style.cursor = "none";
            document.addEventListener('keydown', pressed);
            document.addEventListener('keyup', pressed);
            keys = []; // Array of dicts: {"type": "keydown", "key": "t", "timestamp": 1608923767263}
            settings.style.display = "none";


        } else {
            // Deactivate capturing, show settings, option to download ...
            active = false;
            document.removeEventListener('keydown', pressed);
            document.removeEventListener('keyup', pressed);
            document.documentElement.style.cursor = "auto";
            settings.style.display = "";
            // Auto download, filename="keycapture_timestamp.json"
            save(`keycapture_${Date.now()}.json`, JSON.stringify(keys));
        }
    }
});


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