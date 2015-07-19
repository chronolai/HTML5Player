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
	this.init = function() {
		this.video = document.createElement("video");
		this.video.src = params.url;
		this.video.autoplay = true;
		this.video.controls = true;

		this.video.onmouseup = this.mouseManager.bind(this);
		this.video.onkeydown = this.hotkeyManager.bind(this);

		this.target = document.querySelector(selector);
		this.target.appendChild(this.video);
		this.target.className = 'vp';
		this.target.tabIndex = "1";
		this.target.style.width = params.width || '640px';
		this.target.style.height = params.height || '360px';
		this.target.pseudoStyle("before", "background-image",'url("'+params.cover+'")');

		this.target.ondblclick = this.mouseManager.bind(this);
		this.target.onkeydown = this.hotkeyManager.bind(this);
	};
	this.mouseManager = function(e) {
		if (e.type == "mouseup") {
			if (this.video.paused) {
				this.video.play();
			} else {
				this.video.pause();
			}
		};
		if (e.type == "dblclick") {
			this.toggleFullscreen();
		};
	};
	this.hotkeyManager = function(e) {
		if (e.keyCode == 32) {
			if (this.video.paused) {
				this.video.play();
			} else {
				this.video.pause();
			}	
		};
		if (e.keyCode >=37 && e.keyCode <= 40) {
			if (!this.video.paused) {
				this.video.pause();
				this.video.play();
			};
		};
		if (e.keyCode == 37) {
			this.video.currentTime -= 10;
		};
		if (e.keyCode == 39) {
			this.video.currentTime += 10;
		};
		if (e.keyCode == 38) {
			if (this.video.volume + 0.1 > 1) {
				this.video.volume = 1;
			} else {
				this.video.volume += 0.1;
			};
		};
		if (e.keyCode == 40) {
			if (this.video.volume - 0.1 < 0) {
				this.video.volume = 0;
			} else {
				this.video.volume -= 0.1;
			};
		};
	};
	this.toggleFullscreen = function() {
		var element = this.target;
		if (!element.fullscreenElement &&
		!element.mozFullScreenElement && !element.webkitFullscreenElement && !element.msFullscreenElement ) {
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.msRequestFullscreen) {
				element.msRequestFullscreen();
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (element.exitFullscreen) {
				element.exitFullscreen();
			} else if (element.msExitFullscreen) {
				element.msExitFullscreen();
			} else if (element.mozCancelFullScreen) {
				element.mozCancelFullScreen();
			} else if (element.webkitExitFullscreen) {
				element.webkitExitFullscreen();
			}
		}
	};
	this.init();
};
