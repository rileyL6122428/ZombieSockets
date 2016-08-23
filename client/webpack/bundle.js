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
	var ctx = canvas.getContext("2d");
	var sock = io();
	var GameScript = __webpack_require__(1);
	var MMScript   = __webpack_require__(2);
	var Constants = __webpack_require__(6);
	
	Constants.initDimensions(canvas);
	
	sock.on('To Matchmaking', runMatchMaking);
	var matchmakingIntervalID;
	function runMatchMaking() {
	  // if(gameIntervalID) {
	    // clearInterval(gameIntervalID);
	  // }
	  MMScript.init(sock);
	  matchmakingIntervalID = MMScript.run(ctx);
	}
	
	
	// NOTE DO NOT DELETE THE FOLLOWING!!!
	// sock.on('To Game', runGame);
	// var gameIntervalID;
	// function runGame() {
	//   clearInterval(matchmakingIntervalID);
	//   GameScript.init();
	//   gameIntervalID = GameScript.run();
	// }
	
	sock.on('game entered', () => { console.log("entered game"); });
	
	
	window.addEventListener("beforeunload", (e) => {
	  // TODO CLEAR INTERVALS
	  clearInterval(matchmakingIntervalID);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var GameScript = {
	
	};
	
	module.exports = GameScript;
	
	// var ctx = canvas.getContext('2d');
	// var halfWidth = (canvas.clientWidth - 30) / 2;
	// var halfHeight = (canvas.clientHeight - 30) / 2;
	
	// var socketInitializer = require('./utils/socket_initializer.js');
	// var inputHandler = require('./utils/player_input_handler.js');
	// var GameRenderer = require('./rendering/game_renderer.js');
	// var MatchmakingRenderer = require('./rendering/matchmaking_renderer.js');
	
	// var playerPositions = [[0, 0], [0, 0]];
	
	// socketInitializer.initializeSockets(sock, playerPositions);
	// GameRenderer.setSocketListeners(sock);
	// inputHandler.registerGameOverCB(sock);
	
	// var renderID = setInterval(function() {
	  // if(GameRenderer.readyToRender()) {
	    // GameRenderer.renderCanvasEl(ctx, playerPositions, halfWidth, halfHeight, sock);
	    // inputHandler.handleInput(sock);
	  // }
	// }, 1000/30);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Renderer = __webpack_require__(3);
	var Store = __webpack_require__(4);
	var InputHandler = __webpack_require__(5);
	var sock;
	
	var MatchmakingScript = {
	  init: function (s) {
	    Store.initialzeDataReceivers(s);
	    InputHandler.init(s);
	  },
	
	  run: function (ctx) {
	    var intervalId = setInterval(function() {
	      Renderer.render(ctx);
	      InputHandler.handleInput();
	    }, 1000 / 30);
	
	    return intervalId;
	  }
	};
	
	module.exports = MatchmakingScript;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Store = __webpack_require__(4);
	var InputHandler = __webpack_require__(5);
	var Constants = __webpack_require__(6);
	
	var MatchmakingRenderer = {
	  render: function (ctx) {
	    ctx.clearRect(0, 0, Constants.CANVAS_WIDTH(), Constants.CANVAS_HEIGHT());
	    ctx.fillStyle = "black"
	
	    drawPlayerWaitingDisplay(ctx);
	
	    for (var row = 0; row < 2; row++) {
	      for (var col = 0; col < 2; col++) {
	        drawGameButton(ctx, row, col);
	      }
	    }
	  }
	};
	
	function drawPlayerWaitingDisplay(ctx) {
	  ctx.font = "22px serif";
	  ctx.fillText("Players Waiting: " + Store.waitingPlayerTotal(), 70, 50);
	}
	
	function drawGameButton(ctx, row, col) {
	  var gameNum = 1 + row * 2 + col;
	  var drawX = col * 210 + 30;
	  var drawY = row * 150 + 100;
	
	  ctx.font = "22px serif";
	  ctx.fillText("Game " + gameNum, drawX, drawY);
	
	  drawCursor(gameNum, drawX, drawY, ctx);
	
	  ctx.font = "17px serif";
	  ctx.fillText(
	    "Players: " + Store.getGamePlayerTotal(gameNum - 1),
	    drawX,
	    drawY + 20
	  );
	}
	
	function drawCursor(gameNum, drawX, drawY, ctx) {
	  if(gameNum - 1 === InputHandler.selectedGameIdx()) {
	    ctx.beginPath();
	    ctx.moveTo(drawX + 80, drawY);
	    ctx.lineTo(drawX + 95, drawY + 10);
	    ctx.lineTo(drawX + 95, drawY - 10);
	    ctx.fill();
	  }
	}
	
	module.exports = MatchmakingRenderer;


/***/ },
/* 4 */
/***/ function(module, exports) {

	// DATA WE NEED TO STORE
	// 1) PLAYER TOTALS
	// 2) Zombie TOTAL / per game
	// 3) Human Total / per game
	// 4) Game start time, or last endtime
	// 5) number of players waiting
	
	var _data = {};
	
	module.exports = {
	  initialzeDataReceivers: function (sock) {
	    sock.on('mm update', receiveData);
	  },
	
	  waitingPlayerTotal: function() {
	    return _data.waitingPlayerTotal
	  },
	
	  getGamePlayerTotal: function (idx) {
	    return _data.playerTotals[idx];
	  }
	};
	
	function receiveData(data) {
	  debugger
	  _data = data;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	var _cursorPos = [0,0];
	var _gameTotal = 4; //NOTE Consider having this val initialized by server
	                    //     so that you don't have to manually set it
	var _readyToMoveCursor = true;
	var _readyToChooseGame = true;
	var _sock;
	
	module.exports = {
	  init: function (sock) { _sock = sock; },
	
	  handleInput: function () {
	    this.handleCursorScroll();
	    this.handleGameSelection();
	  },
	
	  handleCursorScroll: function() {
	    if(_readyToMoveCursor) { scrollOnInput(); }
	  },
	
	  handleGameSelection: function() {
	    var idx = this.selectedGameIdx();
	    if(key.isPressed('enter') && _readyToChooseGame) {
	
	      _sock.emit('select game', { gameIdx: idx });
	      _readyToChooseGame = false;
	    }
	  },
	
	  selectedGameIdx: function () {
	    return _cursorPos[0] * Math.floor(_gameTotal / 2) + _cursorPos[1];
	  }
	}
	
	var direcsAndCBs = [
	  ["right", scrollRight],
	  ["left", scrollLeft],
	  ["up", scrollUp],
	  ["down", scrollDown]
	];
	
	function scrollOnInput() {
	  for (var i = 0; i < direcsAndCBs.length; i++) {
	    var direction = direcsAndCBs[i][0];
	    var cb = direcsAndCBs[i][1];
	    if(key.isPressed(direction)) {
	      cb();
	      _readyToMoveCursor = false;
	      setTimeout(() => { _readyToMoveCursor = true }, 150);
	      break;
	    }
	  }
	}
	
	function scrollRight() {
	  _cursorPos[1] = (_cursorPos[1] - 1) % Math.floor(_gameTotal / 2);
	  if(_cursorPos[1] === -1) { _cursorPos[1] = 1; }
	}
	
	function scrollLeft() {
	  _cursorPos[1] = (_cursorPos[1] + 1) % Math.floor(_gameTotal / 2);
	}
	
	function scrollUp() {
	  _cursorPos[0] = (_cursorPos[0] + 1) % 2;
	}
	
	function scrollDown() {
	  _cursorPos[0] = (_cursorPos[0] - 1) % 2;
	  if(_cursorPos[0] === -1) { _cursorPos[0] = Math.floor(_gameTotal / 2) - 1; }
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	var _width;
	var _height;
	
	module.exports = {
	  CANVAS_WIDTH: getWidth,
	  CANVAS_HEIGHT: getHeight,
	  
	  initDimensions: function(c) {
	    _width = c.width;
	    _height = c.height;
	  }
	};
	
	function getWidth()  { return _width;  }
	function getHeight() { return _height; }


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map