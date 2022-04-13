// variable to hold a reference to our A-Frame world
var world;

let output;

// an off screen buffer to hold our dynamic texture
let buffer1;
let texture1;

// our 3D box which will use this texture
let box;

function setup() {
	// no canvas needed
	let c = createCanvas(512, 512);

	// construct the A-Frame world
	world = new World('VRScene', 'mouse');

	// set the background color of the world
	world.setBackground(0,0,0);
	
	// create our off screen graphics buffer & texture
	buffer1 = createGraphics(512, 512);
	texture1 = world.createDynamicTextureFromCreateGraphics( buffer1 );

	// create a box that will be use this texture
	// note the use of the 'overFunction' property
	// -- this function will run one time per frame when the user intersects with the entity
	// -- think of it like a mini "draw" function that runs every time the user hovers over the plane
	// -- with their mouse or VR controller
	box = new Box({
		x:0, y:3, z:-5,
		width:3, height:3, depth:3,
		asset: texture1,
		red: 220, green: 225, blue: 220,
		dynamicTexture: true,
		dynamicTextureWidth: 512,
		dynamicTextureHeight: 512,
		overFunction: function(entity, intersectionInfo) {
			// intersectionInfo is an object that contains info about how the user is
			// interacting with this entity.  it contains the following info:
			// .distance : a float describing how far away the user is
			// .point3d : an object with three properties (x, y & z) describing where the user is touching the entity
			// .point2d : an object with two properites (x & y) describing where the user is touching the entity in 2D space (essentially where on the dynamic canvas the user is touching)
			// .uv : an object with two properies (x & y) describing the raw textural offset (used to compute point2d)

			// draw an ellipse at the 2D intersection point on the dynamic texture
			buffer1.fill(random(255), random(255), random(255));
			buffer1.ellipse( intersectionInfo.point2d.x, intersectionInfo.point2d.y, 20, 20);
		}
	});
	world.add(box);

	// a tiny 'clear' box - click on this box to erase the dynamic texture
	let clearBox = new Box({
		x: 0, y: 0.25, z: -2,
		width: 0.5, height: 0.5, depth: 0.5,
		red: 255, green: 0, blue: 0,
		clickFunction: function(entity) {
			// erase the dynamic texture when you click on the little box
			buffer1.background(255);
		},
		enterFunction: function(entity) {
			// hover state
			entity.setScale(1.1, 1.1, 1.1);
		},
		leaveFunction: function(entity) {
			// deactivate hover state
			entity.setScale(1,1,1);
		}
	});
	world.add(clearBox);

	

	
	// text output to show the current state of the controllers
	output = new Text({
		x:0, y:5, z: -5,
		text: "MARSX",
		red:0, blue:0, green:0,
		scaleX:15,scaleZ:15,scaleY:15
	});
	world.add(output);



	
	

}

let t = "";

function draw() {
	
	box.spinX(0.5);
	// when in immersive VR mode in a VR headset these methoes will return true or false based on
	// the current state of the controller - we are just dropping their return values into the text
	// unit for debugging purposes here. All of these methods return a boolean value.
	t = "RightTrigger: " + world.isControllerRightTriggerDown() + "\n";
	t += "RightGripDown: " + world.isControllerRightGripDown()+ "\n";
	t += "aButton: " + world.isControllerAButtonDown() + "\n";
	t += "bButton: " + world.isControllerBButtonDown() + "\n";
	t += "LeftTrigger: " + world.isControllerLeftTriggerDown() + "\n";
	t += "LeftGripDown: " + world.isControllerLeftGripDown() + "\n";
	t += "xButton: " + world.isControllerXButtonDown() + "\n";
	t += "yButton: " + world.isControllerYButtonDown() + "\n";

	// these two methods will return the direction of the thumbsticks ('LEFT', 'RIGHT', 'UP', 'DOWN") or
	// the boolean value false if the thumbstick is not being touched
	t += "RightThumb: " + world.getControllerRightThumbstickDirection() + "\n";
	t += "LeftThumb: " + world.getControllerLeftThumbstickDirection() + "\n";

	// VR turning (use the left thumbstick to turn left and right)
	if (world.getControllerLeftThumbstickDirection() == 'LEFT') {
		world.rotateCameraY(3);
	}
	if (world.getControllerLeftThumbstickDirection() == 'RIGHT') {
		world.rotateCameraY(-3);
	}

	// VR movement forward
	if (world.getControllerRightThumbstickDirection() == 'UP') {
		world.moveUserForward(0.1);
	}
	
	// you can get raw data on the thumbsticks as well (provides actual pressure value being applied in each direction)
	let leftThumbstickRawData = world.getControllerLeftThumbstickRawData();
	t += 'Left thumb raw data: ' + leftThumbstickRawData.x + ', ' + leftThumbstickRawData.y;

	// update text box
	output.setText(t);
}

	// // floor so we don't feel like we're floating in space
	// world.add(new Plane({
	// 	width: 100, height: 100,
	// 	red:255, green:128, blue:0,
	// 	rotationX: -90
	// }));

//HELPFUL APIS
	//ADDing skies
// let sky = new Sky({
// 		asset: 'sky1'
// 	});
// 	world.add(sky);

//ADDing skies
// let sky = new Sky({
	// 	asset: 'sky1'
	// });
	// world.add(sky);


// some boxes to provide depth
	// for (let i = 0; i < 100; i++) {
	// 	world.add(new Box({
	// 		x: random(-50,50), y:0.5, z: random(-50,50),
	// 		red:random(255), green: random(255), blue: random(255)
	// 	}));
	// }

// adding 3d models
	// eli = new GLTF({
	// 	asset: 'eli',
	// 	x: 2,
	// 	y: 1,
	// 	z: -5
	// });
	// world.add(eli);

	// to spin 3d model
	// eli.spinY(-1);