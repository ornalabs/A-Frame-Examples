// variable to hold a reference to our A-Frame world
let world;
let mic, fft;

function setup() {
	// no canvas needed
	// noCanvas();
    createCanvas(910, 500);
    noFill();
  
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');
}

function draw() {

    background(200);

    let spectrum = fft.analyze();
  
    beginShape();
    for (i = 0; i < spectrum.length; i++) {
      vertex(i, map(spectrum[i], 0, 255, height, 0));
    }
    endShape();
}
