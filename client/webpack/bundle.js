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
	var halfWidth = (canvas.clientWidth - 30) / 2;
	var halfHeight = (canvas.clientHeight - 30) / 2;
	
	var sock = io();
	var socketInitializer = __webpack_require__(1);
	var inputHandler = __webpack_require__(2);
	var renderer = __webpack_require__(3);
	var playerPositions = [[0, 0], [0, 0]];
	
	socketInitializer.initializeSockets(sock, playerPositions);
	renderer.setSocketListeners(sock);
	inputHandler.registerGameOverCB(sock);
	
	var renderID = setInterval(function() {
	  if(renderer.readyToRender()) {
	    renderer.renderCanvasEl(ctx, playerPositions, halfWidth, halfHeight, sock);
	    inputHandler.handleInput(sock);
	  }
	}, 1000/30);
	
	window.addEventListener("beforeunload", (e) => { clearInterval(renderID); });


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  initializeSockets: function (sock, positions) {
	    this.setupHandshakeReciever(sock);
	    this.setupNotificationReciever(sock);
	    this.setupPositionReciever(sock, positions);
	  },
	
	  setupPositionReciever: function (sock, positions) {
	    sock.on('position update', updatePositions);
	    function updatePositions(posArr) {
	      posArr.forEach((pos, idx) => { positions[idx] = posArr[idx]; });
	    }
	  },
	
	  setupHandshakeReciever: function (sock) {
	    sock.on('handShake', onHandshake);
	    function onHandshake(status) {
	      var handShake = document.getElementById("hand-shake");
	      handShake.innerHTML = status;
	    }
	  },
	
	  setupNotificationReciever: function (sock) {
	    sock.on('msg', onMsg);
	    function onMsg(msg) {
	      var status = document.getElementById("server-messages");
	      status.innerHTML = msg;
	    }
	  }
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	var _inputSetup = [
	  ['d', 'move right'],
	  ['a', 'move left'],
	  ['s', 'move down'],
	  ['w', 'move up']
	]
	
	var gameOver = false;
	
	module.exports = {
	  handleInput: function(sock) {
	    _inputSetup.forEach(function(inputs) {
	      if(key.isPressed(inputs[0]) && !gameOver) {　sock.emit(inputs[1]); }
	    });
	  },
	
	  registerGameOverCB: function (sock) {
	    sock.on('game over', () => { gameOver = true; });
	  }
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var inputHandler = __webpack_require__(2);
	var playerIdx;
	var zombieIdxs = {};
	var gameOver = false;
	
	var renderer = {
	  renderCanvasEl: function (ctx, positions, halfWidth, halfHeight) {
	    ctx.clearRect(0, 0, 800, 550);
	    _render(ctx, positions, halfWidth, halfHeight);
	  },
	
	  setSocketListeners: function (s) {
	    _setZombieStatusListener(s);
	    _setPlayerIndexListener(s);
	    _setGameoverListener(s);
	  },
	
	  readyToRender: function () { return playerIdx !== undefined; }
	};
	
	function _setGameoverListener(s) {
	  s.on("game over", () => { gameOver = true; })
	}
	
	function _setZombieStatusListener(s) {
	  s.on("Is a Zombie", (idx) => { zombieIdxs[idx] = true; });
	}
	
	function _setPlayerIndexListener(s) {
	  s.on('register player number', (idx) => { playerIdx = idx; });
	}
	
	function _render(ctx, positions, halfWidth, halfHeight) {
	  var translatedX = -positions[playerIdx][0] + halfWidth;
	  var translatedY = -positions[playerIdx][1] + halfHeight;
	
	  if(gameOver) {
	    ctx.font = "48px serif";
	    ctx.strokeText("GAME OVER", halfWidth - 150, halfHeight);
	  }
	  ctx.translate(translatedX, translatedY);
	  renderBoundary(ctx);
	  _renderPlayers(positions, ctx);
	  ctx.translate(-translatedX, -translatedY);
	}
	
	function _renderPlayers(positions, ctx) {
	  positions.forEach(function(pos, idx) {
	    if(zombieIdxs[idx]) { ctx.strokeStyle = 'green'; }
	    ctx.beginPath();
	    ctx.arc(pos[0], pos[1], 15, 0, 2 * Math.PI, false);
	    ctx.stroke();
	    if(zombieIdxs[idx]) { ctx.strokeStyle = 'black';}
	  });
	}
	
	function renderBoundary(ctx) { ctx.strokeRect(-500, -500, 1000, 1000); }
	
	module.exports = renderer;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map