
function controls() {
    return '<div class="controls">'+
    '<div> Width: <input type="text" name = "h" id="h" > </div>' +
       '<div>Height: <input type="text" name = "w" id="w"> </div>' +
       '<div>Padding: <input type="text" name = "p" id="p"> </div>' +
        '<div><input id="draw" type="submit" value = "Submit" > </div>'+
        '</div>' +
        '<h3 id="err"></h3>'+
        '<h1>The Shape:</h1>'+
        '<div id="canvas"></div>';   
}

function drawShape() {
    let shape = "<p style='font-size: 30px;'>";
    for (let x = 0; x < pixels.length; x++) {
        for (let y = 0; y < pixels[x].length; y++) {
            if (pixels[x][y] == 1) shape = shape + "<span>-</span>";
            if (pixels[x][y] == 2) shape = shape + "<span>|</span>";
            if (pixels[x][y] == 0) shape = shape + "<span style='opacity:0'>-</span>";

        }
        shape = shape + "<br />";
    }
    shape = shape + "</p>";
    document.getElementById("canvas").innerHTML = shape;

}

var shape = "";
var pixels = [];
document.body.innerHTML = controls();


function draw() {
    var height = parseInt((<HTMLInputElement>document.getElementById("h")).value);
    var width = parseInt((<HTMLInputElement>document.getElementById("w")).value);
    var padding = parseInt((<HTMLInputElement>document.getElementById("p")).value);

    //check
    if (width < 20 || width > 299) {
        document.getElementById("err").innerText = "Width value should be even and greater or equal to 20 and less than or equal 300,";
        return;
    }
    if (height < 20 || height > 299) {
        document.getElementById("err").innerText = "height value should be even and greater or equal to 20 and less than or equal 300,";
        return;
    }
    if (padding < 3 || padding > 60) {
        document.getElementById("err").innerText = "Padding value should be even and greater or equal to 4 and less than or equal 60";
        return;
    }

    document.getElementById("err").innerText = "";

    let unitpadding = padding / 2;
    let sh = height;
    let sw = width;
    for (let d = 0; d <= width/2; d+=unitpadding) {
        getBox(d, sh, sw);

        sw = sw - padding;
        sh = sh - padding;
    }
    drawShape();
    console.log(pixels);
}


function getBox(offset, height, width) {
    console.log(offset);
    for (let x = 0; x < height; x++) {
        if (pixels[x + offset] == undefined) pixels[x + offset] = [];
        if (x == 0 || x == height - 1) {
            for (let y = 0; y < width; y++) {
                pixels[x + offset][y + offset] = 1;
            }
        }
        else {
            for (let y = 0; y < width; y++) {
                if (y == 0 || y == width - 1) {
                    pixels[x + offset][y + offset] = 2;
                }
                else {
                    pixels[x + offset][y + offset] = 0;
                }
            }
        }
        
    }
}

document.getElementById("draw").addEventListener("click", () => {
    draw();
});