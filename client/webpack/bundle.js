/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');
	var sock = io()
	var inputHandler = __webpack_require__(1);
	
	var positions = [[0,0], [200,100]];
	var renderID = setInterval(function() {
	  ctx.clearRect(0, 0, 600, 500);
	  positions.forEach((pos) => { ctx.fillRect(pos[0], pos[1], 100, 100); });
	  inputHandler.handleInput(sock);
	}, 1000/30);
	
	window.addEventListener("beforeunload", (e) => { clearInterval(renderID); });
	
	sock.on('position update', updatePositions);
	function updatePositions(posArr) {
	  posArr.forEach((pos, idx) => { positions[idx] = posArr[idx]; })
	}
	
	sock.on('handShake', onHandshake);
	function onHandshake(status) {
	  var handShake = document.getElementById("hand-shake");
	  handShake.innerHTML = status;
	}
	
	sock.on('msg', onMsg);
	function onMsg(msg) {
	  var status = document.getElementById("server-messages");
	  status.innerHTML = msg;
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	var _inputSetup = [
	  ['d', 'move right'],
	  ['a', 'move left'],
	  ['s', 'move down'],
	  ['w', 'move up']
	]
	
	module.exports = {
	  handleInput: function(sock) {
	    _inputSetup.forEach(function(inputs) {
	      console.log("we are reading input");
	      if(key.isPressed(inputs[0])) {　sock.emit(inputs[1]); }
	    });
	  }
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map