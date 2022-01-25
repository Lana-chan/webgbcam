/*
 * ------------------------------------------------------------
 * "THE BEERWARE LICENSE" (Revision 42):
 * maple "mavica" syrup <maple@maple.pet> wrote this code.
 * As long as you retain this notice, you can do whatever you
 * want with this stuff. If we meet someday, and you think this
 * stuff is worth it, you can buy me a beer in return.
 * ------------------------------------------------------------
 */

// 4-color GB palette must be dark to light
const palettes = [
  // AYY4 - https://lospec.com/palette-list/ayy4
  [
    [0, 48, 59],
    [255, 119, 119],
    [255, 206, 150],
    [241, 242, 218]
	],
	/* this one was removed in favour of spacehaze which is very similar
  // Barbie: The Slasher Movie - https://lospec.com/palette-list/barbie-the-slasher-movie
  [
    [0, 0, 0],
    [110, 31, 177],
    [204, 51, 133],
    [248, 251, 243]
	],*/
	// SpaceHaze - https://lospec.com/palette-list/spacehaze
	[
		[11, 6, 48],
		[107, 31, 177],
		[204, 52, 149],
		[248, 227, 196]
	],
  // CRTGB - https://lospec.com/palette-list/crtgb
  [
    [6, 6, 1],
    [11, 62, 8],
    [72, 154, 13],
    [218, 242, 34]
  ],
  // Amber CRTGB - https://lospec.com/palette-list/amber-crtgb
  [
    [13, 4, 5],
    [94, 18, 16],
    [211, 86, 0],
    [254, 208, 24]
  ],
  // Kirby (SGB) - https://lospec.com/palette-list/kirby-sgb
  [
    [44, 44, 150],
    [119, 51, 231],
    [231, 134, 134],
    [247, 190, 247]
  ],
  // CherryMelon - https://lospec.com/palette-list/cherrymelon
  [
    [1, 40, 36],
    [38, 89, 53],
    [255, 77, 109],
    [252, 222, 234]
  ],
  // Pumpkin GB - https://lospec.com/palette-list/pumpkin-gb
  [
    [20, 43, 35],
    [25, 105, 44],
    [244, 110, 22],
    [247, 219, 126]
  ],
  // Purpledawn - https://lospec.com/palette-list/purpledawn
  [
    [0, 27, 46],
    [45, 117, 126],
    [154, 123, 188],
    [238, 253, 237]
  ],
  // Royal4 - https://lospec.com/palette-list/royal4
  [
    [82, 18, 150],
    [138, 31, 172],
    [212, 134, 74],
    [235, 219, 94]
  ],
  // Grand Dad 4 - https://lospec.com/palette-list/grand-dad-4
  [
    [76, 28, 45],
    [210, 60, 78],
    [95, 177, 245],
    [234, 245, 250]
  ],
  // Mural GB - https://lospec.com/palette-list/mural-gb
  [
    [10, 22, 78],
    [162, 81, 48],
    [206, 173, 107],
    [250, 253, 255]
  ],
  // Ocean GB - https://lospec.com/palette-list/ocean-gb
  [
    [28, 21, 48],
    [42, 48, 139],
    [54, 125, 1216],
    [141, 226, 246]
	],
	// Alleyway - ISS
	[
		[66, 66, 66],
		[123, 123, 206],
		[255, 107, 255],
		[255, 214, 0]
	],
	// Pocket - ISS
	[
		[108, 108, 78],
		[142, 139, 97],
		[195, 196, 165],
		[227, 230, 201]
	],
  // Kadabura4 - https://lospec.com/palette-list/kadabura4
  [
    [0, 0, 0],
    [87, 87, 87],
    [219, 0, 12],
    [255, 255, 255]
  ],
  // Virtual - ISS
  [
    [2, 0, 0],
    [65, 0, 0],
    [127, 0, 0],
    [255, 0, 0]
  ],
  // Love! Love! - ISS
  [
    [176, 16, 48],
    [255, 96, 176],
    [255, 184, 232],
    [255, 255, 255]
  ],
  // Metroid II (SGB) - https://lospec.com/palette-list/metroid-ii-sgb
  [
    [44, 23, 0],
    [4, 126, 96],
    [182, 37, 88],
    [174, 223, 30]
  ],
  // Micro 86 - https://lospec.com/palette-list/micro-86
  [
    [38, 0, 14],
    [255, 0, 0],
    [255, 123, 48],
    [255, 217, 178]
  ],
  // Vivid 2Bit Scream - https://lospec.com/palette-list/vivid-2bit-scream
  [
    [86, 29, 23],
    [92, 79, 163],
    [116, 175, 52],
    [202, 245, 50]
	],
	// Pastel GBC/SGB - submitted by synth___ruiner
	[ 
		[4,2,4],
		[156,146,244],
		[236,138,140],
		[252,250,172]
	],
	// trans flag - by mavica
	[
		[32, 32, 32],
		[91, 207, 250],
		[245, 171, 185],
		[255, 255, 255]
	],
	// grayscale - by mavica
	[
		[40, 40, 40],
		[104, 104, 104],
		[168, 168, 168],
		[252, 252, 252]
	],
	// Scold 2 bit - https://lospec.com/palette-list/scold-2-bit
	[
		[16, 28, 86],
		[206, 0, 148],
		[15, 183, 0],
		[211,211,211]
	],
	// strawberry parfait - by mavica
	[
		[31, 19, 0],
		[216, 32, 46],
		[247, 80, 215],
		[255, 231, 204]
	],
	// bric-a-brac - by mavica
	[
		[12, 39, 56],
		[237, 79, 54],
		[248, 150, 23],
		[184, 211, 218]
	]
];

const cameraStream = document.querySelector("#camera-stream"),
			cameraView = document.querySelector("#camera-view"),
			cameraOutput = document.querySelector("#camera-output"),
			cameraDiv = document.querySelector("#camera"),
			appView = document.querySelector("#app-view"),
			uiMain = document.querySelector("#ui-main"),
			uiCapture = document.querySelector("#ui-capture"),
			uiSettings = document.querySelector("#ui-settings"),
			uiHidden = document.querySelector("#ui-hidden"),
			uiTimer = document.querySelector("#ui-timer"),
			uiRecord = document.querySelector("#ui-record"),
			gifPreview = document.querySelector("#gif-preview"),
			gifImg = document.querySelector("#gif-img"),
			gifButtons = document.querySelector("#gif-buttons");
var amountOfCameras = 0;
var currentFacingMode = 'user';
var appScale;
var frameDrawing;
const gifLength = 50;
const outputScale = 5;
var gifRecording,
		gifEncoder,
		gifFrames,
		gifBlob;

// global settings for gbcamera
var renderWidth = 160,
		renderHeight = 144,
		currentPalette = 0,
		currentUI = uiMain;

var cameraVars = {
	width: 128,
	height: 112,
	dither: 0.6,
	contrast: 3,
	gamma: 3,
	xOffset: 0,
	yOffset: 0,
	xScale: 1,
	yScale: 1
};

const sliderGamma = [
	2.5,
	2,
	1.5,
	1,
	0.8,
	0.6,
	0.4
];

const sliderContrast = [
	0.6,
	0.9,
	1.2,
	1.5,
	1.8,
	2.1,
	2.4
];

// 8 x 8 Bayer Matrix
const bayer8 = [
	[0,48,12,60,3,51,15,63],
	[32,16,44,28,35,19,47,31],
	[8,56,4,52,11,59,7,55],
	[40,24,36,20,43,27,39,23],
	[2,50,14,62,1,49,13,61],
	[34,18,46,30,33,17,45,29],
	[10,58,6,54,9,57,5,53],
	[42,26,38,22,41,25,37,21]
];

const clampNumber = (num, a, b) => Math.min(Math.max(num, a), b);

// function to check if phone is portrait oriented
function screenIsPortrait() {
	try {
		let orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
		if(orientation != undefined) {
			if(orientation.includes('portrait')) return true;
		} else if(window.orientation != undefined) {
			if(window.orientation == 0) return true;
		}
		return false;
	} catch(e) {
		return false;
	}
}

//Function to get the mouse position
function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
			x: (event.clientX - rect.left) / appScale,
			y: (event.clientY - rect.top) / appScale
	};
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect){
	return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

function switchCameras() {
	if(amountOfCameras > 1) {
		if (currentFacingMode === 'environment') currentFacingMode = 'user';
		else currentFacingMode = 'environment';
		initCameraStream();
	}
}

function download(filename, content) {
  var element = document.createElement('a');
  element.setAttribute('href', content);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function getFileDate() {
	let now = new Date();
	// i love javascript
	let dateString = now.getDate() + "-" + (now.getMonth()+1) + "-"+ now.getFullYear() + " " + now.getHours() + " " + now.getMinutes() + " " + now.getSeconds();
	return dateString;
}

function savePicture() {
	let ctx = cameraOutput.getContext("2d");
	ctx.drawImage(cameraView, 0,0, cameraOutput.width, cameraOutput.height);
	Filters.filterImage(Filters.paletteSwap, cameraOutput, [palettes[currentPalette]])
	var dataURL = cameraOutput.toDataURL('image/png');
	download("webgbcam " + getFileDate() + ".png", dataURL);
}

// bounding boxes for each button in the app
var buttons = {
	bottomLeft: {
		x:1,
		y:113,
		width:30,
		height:30
	},
	bottomRight: {
		x:129,
		y:113,
		width:30,
		height:30
	},
	topLeft: {
		x:1,
		y:1,
		width:30,
		height:30
	},
	contrastLeft: {
		x:10,
		y:13,
		width:15,
		height:13
	},
	contrastRight: {
		x:25,
		y:13,
		width:15,
		height:13
	},
	brightnessLeft: {
		x:65,
		y:13,
		width:15,
		height:13
	},
	brightnessRight: {
		x:80,
		y:13,
		width:15,
		height:13
	},
	paletteLeft: {
		x:120,
		y:13,
		width:15,
		height:13
	},
	paletteRight: {
		x:135,
		y:13,
		width:15,
		height:13
	},
	screenHotspot: {
		x:31,
		y:31,
		width:98,
		height:82
	},
	hideUI: {
		x:145,
		y:0,
		width:15,
		height:15
	},
	timer: {
		x:33,
		y:131,
		width:13,
		height:13
	},
	record: {
		x:48,
		y:131,
		width:16,
		height:13
	}
};

function applyLevels(value, brightness, contrast, gamma) {
	let newValue = value / 255.0;
	newValue = (newValue - 0.5) * contrast + 0.5;
	//newValue = newValue + brightness;
	return Math.pow(clampNumber(newValue, 0, 1), gamma) * 255;
}

var Filters = {};
Filters.getPixels = function(c) {
	return c.getContext('2d').getImageData(0,0,c.width,c.height);
};

Filters.filterImage = function(filter, canvas, var_args) {
	let args = [this.getPixels(canvas)];
	for (let i=0; i<var_args.length; i++) {
		args.push(var_args[i]);
	}
	let idata = filter.apply(null, args);
	canvas.getContext("2d").putImageData(idata, 0, 0);
};

Filters.gbcamera = function(pixels, ditherFactor) {
	let d = pixels.data;

	for(let y = 0; y < pixels.height; y++) {
		for(let x = 0; x < pixels.width; x++) {
			let n = (x + y*pixels.width);
			let i = n * 4;

			let bayer = bayer8[(y)%8][(x)%8];

			let r = d[i];
			let g = d[i+1];
			let b = d[i+2];

			// grayscale
			let c = r*0.3 + g*0.59 + b*0.11;

			// apply levels
			c = clampNumber(applyLevels(c, 0, sliderContrast[cameraVars.contrast], sliderGamma[cameraVars.gamma]), 0, 255);

			// apply bayer
			c = clampNumber(c + ((bayer - 32) * ditherFactor), 0, 255);

			// quantize to four places which will determine palette color
			c = clampNumber(Math.round(c / 64), 0, 3) * 64;

			d[i] = c;
			d[i+1] = c;
			d[i+2] = c;
		}
	}
	
	return pixels;
}

// takes grayscale and paints it with palette
Filters.paletteSwap = function(pixels, palette) {
	let d = pixels.data;

	for (let i = 0; i < d.length; i += 4) {
		let c = clampNumber(Math.floor(d[i] / 64), 0, 3);
		
		let r,g,b;
		[r, g, b] = palette[c];

		d[i] = r;
		d[i+1] = g;
		d[i+2] = b;
	}

	return pixels;
}

// this function counts the amount of video inputs
// it replaces DetectRTC that was previously implemented.
function deviceCount() {
	return new Promise(function (resolve) {
		var videoInCount = 0;

		navigator.mediaDevices
			.enumerateDevices()
			.then(function (devices) {
				devices.forEach(function (device) {
					if (device.kind === 'video') {
						device.kind = 'videoinput';
					}

					if (device.kind === 'videoinput') {
						videoInCount++;
						//console.log('videocam: ' + device.label);
					}
				});

				resolve(videoInCount);
			})
			.catch(function (err) {
				console.log(err.name + ': ' + err.message);
				resolve(0);
			});
	});
}

document.addEventListener('DOMContentLoaded', function (event) {
	// check if mediaDevices is supported
	if (
		navigator.mediaDevices &&
		navigator.mediaDevices.getUserMedia &&
		navigator.mediaDevices.enumerateDevices
	) {
		// first we call getUserMedia to trigger permissions
		// we need this before deviceCount, otherwise Safari doesn't return all the cameras
		// we need to have the number in order to display the switch front/back button
		navigator.mediaDevices
			.getUserMedia({
				audio: false,
				video: true,
			})
			.then(function (stream) {
				stream.getTracks().forEach(function (track) {
					track.stop();
				});

				deviceCount().then(function (deviceCount) {
					amountOfCameras = deviceCount;

					// init the UI and the camera stream
					initCameraUI();
					initCameraStream();
				});
			})
			.catch(function (error) {
				//https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
				if (error.name === 'NotAllowedError') {
					alert('camera permission denied, please refresh and allow camera capture!');
				} else if (error.name === 'NotFoundError') {
					alert('no cameras found! make sure your webcam is plugged in and enabled!');
				} else {
					alert('unspecified camera error! make sure camera permissions are enabled!');
				}

				console.error('getUserMedia() error: ', error);
			});
	} else {
		alert(
			'it seems your browser does not support camera capture! :(',
		);
	}
});

function restartCamera() {
	setTimeout(function() {
		initAppScaling();
		initCameraDrawing();
	}, 300);
}

window.onorientationchange = restartCamera;
window.onresize = restartCamera;

function captureImage() {
	cameraStream.pause();
	currentUI = uiCapture;
}

function initCameraUI() {
	initAppScaling();

	// handle canvas app clicks
	appView.addEventListener('click', function(e) {
    var mousePos = getMousePos(appView, e);

		// buttons in main screen
		if(currentUI === uiMain) {
			if(isInside(mousePos, buttons.bottomLeft) || isInside(mousePos, buttons.screenHotspot)) {
				// shutter
				captureImage();
			} else if(isInside(mousePos, buttons.bottomRight)) {
				// switch camera
				switchCameras();
			} else if(isInside(mousePos, buttons.topLeft)) {
				// go to settings
				currentUI = uiSettings;
			} else if(isInside(mousePos, buttons.hideUI)) {
				// hide UI buttons
				currentUI = uiHidden;
			} else if(isInside(mousePos, buttons.timer)) {
				// change UI to timer and trigger 3s delay to capture
				currentUI = uiTimer;
				setTimeout(captureImage, 3000);
			} else if(isInside(mousePos, buttons.record)) {
				// start GIF recording
				gifStart();
			}
		} else if(currentUI === uiCapture) {
			if(isInside(mousePos, buttons.bottomLeft)) {
				// return
				cameraStream.play();
				currentUI = uiMain;
			} else if(isInside(mousePos, buttons.bottomRight)) {
				// save picture
				savePicture();
			} else if(isInside(mousePos, buttons.topLeft)) {
				// go to settings
				currentUI = uiSettings;
			} 
		} else if(currentUI === uiSettings) {
			if(isInside(mousePos, buttons.bottomLeft)) {
				// return
				if(cameraStream.paused == true) {
					// we're in capture
					currentUI = uiCapture;
				} else {
					currentUI = uiMain;
				}
			} else if(isInside(mousePos, buttons.contrastLeft)) {
				if(cameraVars.contrast > 0) cameraVars.contrast--;
			} else if(isInside(mousePos, buttons.contrastRight)) {
				if(cameraVars.contrast < 6) cameraVars.contrast++;
			} else if(isInside(mousePos, buttons.brightnessLeft)) {
				if(cameraVars.gamma > 0) cameraVars.gamma--;
			} else if(isInside(mousePos, buttons.brightnessRight)) {
				if(cameraVars.gamma < 6) cameraVars.gamma++;
			} else if(isInside(mousePos, buttons.paletteLeft)) {
				currentPalette--;
				if(currentPalette < 0) currentPalette = palettes.length-1;
			} else if(isInside(mousePos, buttons.paletteRight)) {
				currentPalette++;
				if(currentPalette >= palettes.length) currentPalette = 0;
			}
		} else if(currentUI === uiHidden) {
			if(isInside(mousePos, buttons.hideUI)) {
				// go back to main
				currentUI = uiMain;
			}
		}
    
	}, false);
}

function initAppScaling() {
	// figure out max integer render scale for window
	if(window.innerWidth >= window.innerHeight) {
		// horizontal
		appScale = Math.floor(window.innerHeight / renderHeight);
	} else {
		// vertical
		appScale = Math.floor(window.innerWidth / renderWidth);
	}
	cameraDiv.style.width = appScale * renderWidth + "px";
	cameraDiv.style.height = appScale * renderHeight + "px";

	// canvas sizes
	cameraView.width = cameraVars.width;
	cameraView.height = cameraVars.height;
	appView.width = renderWidth;
	appView.height = renderHeight;
}

// https://github.com/webrtc/samples/blob/gh-pages/src/content/devices/input-output/js/main.js
function initCameraStream() {
	// stop any active streams in the window
	if (window.stream) {
		window.stream.getTracks().forEach(function (track) {
			//console.log(track);
			track.stop();
		});
	}

	var constraints = {
		audio: false,
		video: {
			width: { ideal: 640 },
			height: { ideal: 480 },
			facingMode: currentFacingMode,
		},
	};
	
	function handleSuccess(stream) {
		window.stream = stream; // make stream available to browser console
		cameraStream.srcObject = stream;

		let track = window.stream.getVideoTracks()[0];
		cameraStream.width = track.getSettings().width;
		cameraStream.height = track.getSettings().height;
		
		setTimeout(initCameraDrawing, 500);
	}
	
	function handleError(error) {
		console.error('getUserMedia() error: ', error);
	}
	
	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(handleSuccess)
		.catch(handleError);
}

function initCameraDrawing() {
	// if cameraStream has vertical or horizontal resolution of 0 then it's not initialized, we retry until the browser decides to properly work
	if (cameraStream.videoHeight == 0) setTimeout(restartCamera, 500);

	const track = window.stream.getVideoTracks()[0];
	let settings = track.getSettings();
	let str = JSON.stringify(settings, null, 4);
	console.log('settings ' + str);

	// calculate scale and offset to render camera stream to camera view canvas
	if(cameraStream.videoWidth >= cameraStream.videoHeight) {
		// horizontal
		cameraVars.yScale = cameraStream.videoHeight;
		cameraVars.xScale = Math.floor((cameraStream.videoHeight / cameraVars.height) * cameraVars.width);
		cameraVars.yOffset = 0;
		cameraVars.xOffset = Math.floor((cameraStream.videoWidth - cameraVars.xScale) / 2);
	} else {
		//vertical
		cameraVars.xScale = cameraStream.videoWidth;
		cameraVars.yScale = Math.floor((cameraStream.videoWidth / cameraVars.width) * cameraVars.height);
		cameraVars.xOffset = 0;
		cameraVars.yOffset = Math.floor((cameraStream.videoHeight - cameraVars.yScale) / 2);
	}
	
	// canvas starts flipped for user facing camera
	if(settings.facingMode != "environment") { // not environment = front-facing phone cam or pc webcam, flip
		cameraView.getContext('2d').setTransform(-1, 0, 0, 1, cameraVars.width, 0);
	} else {
		cameraView.getContext('2d').setTransform(1, 0, 0, 1, 0, 0);
	}
	console.log(cameraVars);
	
	cameraOutput.width = cameraVars.width * outputScale;
	cameraOutput.height = cameraVars.height * outputScale;
	let ctx = cameraOutput.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	cameraStream.play();
	
	clearInterval(frameDrawing)
	frameDrawing = setInterval(drawFrame, 100);
}

function showGifModal() {
	gifPreview.classList.remove("hidden");
}

function loadGifModal(blob) {
	gifImg.src = URL.createObjectURL(blob);
	gifBlob = blob;
	gifButtons.classList.remove("hidden");
}

function downloadGif() {
	download("webgbcam " + getFileDate() + ".gif", URL.createObjectURL(gifBlob));
	resetGifModal();
}

function resetGifModal() {
	gifBlob = null;
	gifImg.src = "loading.gif";
	gifPreview.classList.add("hidden");
	gifButtons.classList.add("hidden");
}

function gifStart() {
	gifEncoder = new GIF({
		workers: 2,
		workerScript: 'gifjs/gif.worker.js',
		quality: 10,
		repeat: 0,
		width: cameraOutput.width,
		height: cameraOutput.height
	});
	gifEncoder.on('finished', function(blob) {
		loadGifModal(blob);
		//download("webgbcam " + getFileDate() + ".gif", URL.createObjectURL(blob));
	});
	gifFrames = gifLength;
	currentUI = uiRecord;
	gifRecording = true;
}

function gifEnd() {
	gifRecording = false;
	currentUI = uiMain;
	gifEncoder.render();
	showGifModal();
}

function gifFrame() {
	let ctx = cameraOutput.getContext("2d");
	Filters.filterImage(Filters.paletteSwap, cameraView, [palettes[currentPalette]])
	ctx.drawImage(cameraView, 0,0, cameraOutput.width, cameraOutput.height);
	gifEncoder.addFrame(ctx, {delay: 100, copy: true});
	if(--gifFrames == 0) gifEnd();
}

function drawFrame() {
	let camctx = cameraView.getContext('2d');
	camctx.drawImage(cameraStream, cameraVars.xOffset, cameraVars.yOffset, cameraVars.xScale, cameraVars.yScale, 0, 0, cameraVars.width, cameraVars.height);
	
	Filters.filterImage(Filters.gbcamera, cameraView, [cameraVars.dither]);
	
	let ctx = appView.getContext("2d");
	ctx.drawImage(cameraView, 16, 16);
	ctx.drawImage(currentUI, 0, 0);

	if (currentUI === uiSettings) {
		// update settings values	
		ctx.fillStyle = "rgb(192,192,192)";
		for(let i = 1; i <= cameraVars.contrast; i++) {
			ctx.fillRect(42, 22 - (i*3), 4, 2);
		}
		for(let i = 1; i <= cameraVars.gamma; i++) {
			ctx.fillRect(97, 22 - (i*3), 4, 2);
		}
	} else if (currentUI === uiRecord) {
		// update record length
		ctx.fillStyle = "rgb(64,64,64)";
		ctx.fillRect(25, 134, 110 - (gifFrames / gifLength * 110), 6);
	}

	try {
		Filters.filterImage(Filters.paletteSwap, appView, [palettes[currentPalette]])
	} catch(e) {

	}
	if (gifRecording) gifFrame();
}
