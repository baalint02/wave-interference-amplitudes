const canvasSize = 800;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
      }
};

var sources_distance = 100;

var source1 = new Point(0, 0);
var source2 = new Point(0, 0);

var wavelength = 30;

function updateSources() {
    source1 = new Point(canvasSize / 2, canvasSize / 2 - sources_distance / 2);
    source2 = new Point(canvasSize / 2, canvasSize / 2 + sources_distance / 2);
}


window.onload = function WindowLoad(event) {
    updateSources();
    draw();
    
    let wavelengthSlider = document.getElementById("slider_wavelength");
    wavelengthSlider.value = wavelength;
    wavelengthSlider.oninput = function() {
        wavelength = this.value;
        draw();
    }

    let distanceSlider = document.getElementById("slider_distance");
    distanceSlider.value = sources_distance;
    distanceSlider.oninput = function() {
        sources_distance = this.value;
        updateSources();
        draw();
    }
}

function draw() {
    const c = document.getElementById("canvas");
    const canvas = c.getContext("2d");
    const imageData = canvas.createImageData(canvasSize, canvasSize);
    for (let i = 0; i < imageData.data.length; i += 4) {
        let x = (i % (4 * canvasSize)) / 4;
        let y = Math.floor(i / (4 * canvasSize));

        var rgba = this.getPixel(new Point(x, y));

        imageData.data[i + 0] = rgba[0];
        imageData.data[i + 1] = rgba[1];
        imageData.data[i + 2] = rgba[2];
        imageData.data[i + 3] = rgba[3];
    }

    canvas.putImageData(imageData, 0, 0);
}

function distance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

function getPixel(p) {
    if (distance(p, source1) < 5 || distance(p, source2) < 5) {
        return [255, 0, 0, 255];
    }
    let phaseDiff = (Math.abs(distance(p, source1) - distance(p, source2)) % wavelength) / wavelength;
    let alpha = Math.floor((Math.abs(phaseDiff - 0.5) / 0.5) * 255);
    return [0, 0, 255, alpha];
}