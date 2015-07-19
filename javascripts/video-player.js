var UID = {
	_current: 0,
	getNew: function(){
		this._current++;
		return this._current;
	}
};

HTMLElement.prototype.pseudoStyle = function(element,prop,value){
	var _this = this;
	var _sheetId = "pseudoStyles";
	var _head = document.head || document.getElementsByTagName('head')[0];
	var _sheet = document.getElementById(_sheetId) || document.createElement('style');
	_sheet.id = _sheetId;
	var className = "pseudoStyle" + UID.getNew();
	
	_this.className +=  " "+className; 
	
	_sheet.innerHTML += " ."+className+":"+element+"{"+prop+":"+value+"}";
	_head.appendChild(_sheet);
	return this;
};

function VideoPlayer(selector, params) {
	var video, target;

	video = document.createElement("video");
	video.src = params.url;
	video.autoplay = true;
	video.controls = true;

	this.getVideo = function() {
		return video;
	};
	this.getTarget = function() {
		return target;
	};

	video.onmouseup = function() {
		this.focus();
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	};
	video.onkeydown = function(e) {
		if (e.keyCode == 32) {
			if (video.paused) {
				video.play();
			} else {
				video.pause();
			}	
		};
		if (e.keyCode >=37 && e.keyCode <= 40) {
			if (!video.paused) {
				video.pause();
				video.play();
			};
		};
		if (e.keyCode == 37) {
			video.currentTime -= 10;
		};
		if (e.keyCode == 39) {
			video.currentTime += 10;
		};
		if (e.keyCode == 38) {
			if (video.volume + 0.1 > 1) {
				video.volume = 1;
			} else {
				video.volume += 0.1;
			};
		};
		if (e.keyCode == 40) {
			if (video.volume - 0.1 < 0) {
				video.volume = 0;
			} else {
				video.volume -= 0.1;
			};
		};
	};

	target = document.querySelector(selector);
	target.appendChild(video);
	target.className = 'vp';
	target.tabIndex = "1";
	target.style.width = params.width || '640px';
	target.style.height = params.height || '360px';
	target.pseudoStyle("before", "background-image",'url("'+params.cover+'")');

	target.ondblclick = function() {
		toggleFullscreen();
	};
	target.onkeydown = function(e) {
		if (e.keyCode == 32) {
			if (video.paused) {
				video.play();
			} else {
				video.pause();
			}	
		};
		if (e.keyCode >=37 && e.keyCode <= 40) {
			if (!video.paused) {
				video.pause();
				video.play();
			};
		};
		if (e.keyCode == 37) {
			video.currentTime -= 10;
		};
		if (e.keyCode == 39) {
			video.currentTime += 10;
		};
		if (e.keyCode == 38) {
			if (video.volume + 0.1 > 1) {
				video.volume = 1;
			} else {
				video.volume += 0.1;
			};
		};
		if (e.keyCode == 40) {
			if (video.volume - 0.1 < 0) {
				video.volume = 0;
			} else {
				video.volume -= 0.1;
			};
		};
	};

	var toggleFullscreen = function() {
		if (!target.fullscreenElement &&
		!target.mozFullScreenElement && !target.webkitFullscreenElement && !target.msFullscreenElement ) {
			if (target.requestFullscreen) {
				target.requestFullscreen();
			} else if (target.msRequestFullscreen) {
				target.msRequestFullscreen();
			} else if (target.mozRequestFullScreen) {
				target.mozRequestFullScreen();
			} else if (target.webkitRequestFullscreen) {
				target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (target.exitFullscreen) {
				target.exitFullscreen();
			} else if (target.msExitFullscreen) {
				target.msExitFullscreen();
			} else if (target.mozCancelFullScreen) {
				target.mozCancelFullScreen();
			} else if (target.webkitExitFullscreen) {
				target.webkitExitFullscreen();
			}
		}

	};
};
