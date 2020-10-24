/*
 * ------------------------------------------------------------
 * "THE BEERWARE LICENSE" (Revision 42):
 * maple "mavica" syrup <maple@maple.pet> wrote this code.
 * As long as you retain this notice, you can do whatever you
 * want with this stuff. If we meet someday, and you think this
 * stuff is worth it, you can buy me a beer in return.
 * ------------------------------------------------------------
 */

import palettes from './palettes.js';

const cameraStream = document.querySelector("#camera-stream"),
			cameraView = document.querySelector("#camera-view"),
			cameraOutput = document.querySelector("#camera-output"),
			cameraDiv = document.querySelector("#camera"),
			appView = document.querySelector("#app-view"),
			uiMain = document.querySelector("#ui-main"),
			uiCapture = document.querySelector("#ui-capture"),
			uiSettings = document.querySelector("#ui-settings");
var amountOfCameras = 0;
var currentFacingMode = 'user';
var reportedFacingMode;
var appScale;
var frameDrawing;

// global settings for gbcamera
var cameraWidth = 128,
		cameraHeight = 112,
		cameraDither = 0.6,
		//cameraBrightness = 0.0,
		cameraContrast = 3,
		cameraGamma = 3,
		renderWidth = 160,
		renderHeight = 144,
		currentPalette = 0,
		currentUI = uiMain;

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

function savePicture() {
	let scale = 5;

	let now = new Date();
	// i love javascript
	let dateString = now.getDate() + "-" + (now.getMonth()+1) + "-"+ now.getFullYear() + " " + now.getHours() + " " + now.getMinutes() + " " + now.getSeconds();

	cameraOutput.width = cameraWidth * scale;
	cameraOutput.height = cameraHeight * scale;
	let ctx = cameraOutput.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(cameraView, 0,0, cameraOutput.width, cameraOutput.height);
	Filters.filterImage(Filters.paletteSwap, cameraOutput, [palettes[currentPalette]])
	var dataURL = cameraOutput.toDataURL('image/png');
	download("webcamgb " + dateString + ".png", dataURL);
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
			c = clampNumber(applyLevels(c, 0, sliderContrast[cameraContrast], sliderGamma[cameraGamma]), 0, 255);

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
				if (error === 'PermissionDeniedError') {
					alert('Permission denied. Please refresh and give permission.');
				}

				console.error('getUserMedia() error: ', error);
			});
	} else {
		alert(
			'Mobile camera is not supported by browser, or there is no camera detected/connected',
		);
	}
});

function initCameraUI() {
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
	cameraView.width = cameraWidth;
	cameraView.height = cameraHeight;
	appView.width = renderWidth;
	appView.height = renderHeight;

	// handle canvas app clicks
	appView.addEventListener('click', function(e) {
    var mousePos = getMousePos(appView, e);

		// buttons in main screen
		if(currentUI === uiMain) {
			if(isInside(mousePos, buttons.bottomLeft)) {
				// shutter
				cameraStream.pause();
				currentUI = uiCapture;
			} else if(isInside(mousePos, buttons.bottomRight)) {
				// switch camera
				switchCameras();
			} else if(isInside(mousePos, buttons.topLeft)) {
				// go to settings
				currentUI = uiSettings;
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
				if(cameraContrast > 0) cameraContrast--;
			} else if(isInside(mousePos, buttons.contrastRight)) {
				if(cameraContrast < 6) cameraContrast++;
			} else if(isInside(mousePos, buttons.brightnessLeft)) {
				if(cameraGamma > 0) cameraGamma--;
			} else if(isInside(mousePos, buttons.brightnessRight)) {
				if(cameraGamma < 6) cameraGamma++;
			} else if(isInside(mousePos, buttons.paletteLeft)) {
				currentPalette--;
				if(currentPalette < 0) currentPalette = palettes.length-1;
			} else if(isInside(mousePos, buttons.paletteRight)) {
				currentPalette++;
				if(currentPalette >= palettes.length) currentPalette = 0;
			}
		}
    
	}, false);
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

	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(handleSuccess)
		.catch(handleError);

	function handleSuccess(stream) {
		window.stream = stream; // make stream available to browser console
		cameraStream.srcObject = stream;

		const track = window.stream.getVideoTracks()[0];
		const settings = track.getSettings();
		let str = JSON.stringify(settings, null, 4);
		console.log('settings ' + str);
		reportedFacingMode = settings.facingMode;
		
		// canvas starts flipped for user facing camera
		cameraView.getContext('2d').setTransform(1, 0, 0, 1, 0, 0);
		if(reportedFacingMode != 'environment') cameraView.getContext('2d').scale(-1,1);

		clearInterval(frameDrawing)
		frameDrawing = setInterval(drawFrame, 100);
	}

	function handleError(error) {
		console.error('getUserMedia() error: ', error);
	}
}

function drawFrame() {
	let xOffset, yOffset, xScale, yScale;

	// calculate scale and offset to render camera stream to camera view canvas
	if(cameraStream.videoWidth >= cameraStream.videoHeight) {
		// horizontal
		yScale = cameraHeight;
		xScale = (cameraHeight / cameraStream.videoHeight) * cameraStream.videoWidth;
		yOffset = 0;
		xOffset = -((xScale - cameraWidth) / 2);
	} else {
		//vertical
		xScale = cameraWidth;
		yScale = (cameraWidth / cameraStream.videoWidth) * cameraStream.videoHeight;
		xOffset = 0;
		yOffset = -((yScale - cameraHeight) / 2);
	}

	let camctx = cameraView.getContext('2d');

	if(reportedFacingMode != 'environment') {
		xOffset *= -1;
		xScale *= -1;
	}
	camctx.drawImage(cameraStream, xOffset, yOffset, xScale, yScale);
	
	Filters.filterImage(Filters.gbcamera, cameraView, [cameraDither]);
	
	let ctx = appView.getContext("2d");
	ctx.drawImage(cameraView, 16, 16);
	ctx.drawImage(currentUI, 0, 0);

	if(currentUI === uiSettings) {
		// update settings values
		ctx.fillStyle = "rgb(192,192,192)"
		for(let i = 1; i <= cameraContrast; i++) {
			ctx.fillRect(42, 22 - (i*3), 4, 2);
		}
		for(let i = 1; i <= cameraGamma; i++) {
			ctx.fillRect(97, 22 - (i*3), 4, 2);
		}
	}

	Filters.filterImage(Filters.paletteSwap, appView, [palettes[currentPalette]])
}