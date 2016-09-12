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

	var Constants = __webpack_require__(1);
	
	var canvas = document.getElementById("canvas");
	    canvas.width  = Constants.CANVAS_WIDTH;
	    canvas.height = Constants.CANVAS_HEIGHT;
	
	var ctx    = canvas.getContext("2d"),
	    sock   = io();
	
	var GameScript  = __webpack_require__(2),
	    MMScript    = __webpack_require__(6),
	    PurgScript  = __webpack_require__(10);
	
	var ModuleRunner = __webpack_require__(13),
	    ClientModule = __webpack_require__(14);
	
	ModuleRunner.addModules([
	  new ClientModule(MMScript  , 'To Matchmaking', sock, ctx),
	  new ClientModule(PurgScript, 'To Purgatory'  , sock, ctx),
	  new ClientModule(GameScript, 'To Game'       , sock, ctx)
	]);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  PLAYER_TOTAL: 4,
	  GAME_TOTAL: 4,
	  MM_SCROLL_COOLDOWN: 150,
	  CANVAS_WIDTH: 850,
	  CANVAS_HEIGHT: 550
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var InputHandler = __webpack_require__(3),
	    Store        = __webpack_require__(4),
	    Renderer     = __webpack_require__(5),
	    Constants    = __webpack_require__(1);
	
	var GameScript = {
	  init: function (sock) {
	    Store.reset();
	    Store.init(sock);
	  },
	
	  run: function (ctx) {
	    var halfWidth  = (Constants.CANVAS_WIDTH  - 30) / 2,
	        halfHeight = (Constants.CANVAS_HEIGHT - 30) / 2;
	
	    return setInterval (function() {
	      if(Store.readyToRender()) {
	        Renderer.renderCanvasEl(ctx, halfWidth, halfHeight);
	        InputHandler.handleInput();
	      }
	    }, 1000/30);
	  }
	};
	
	module.exports = GameScript;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Store = __webpack_require__(4);
	
	var _inputSetup = [
	  ['right', 'move right'],
	  ['left', 'move left'],
	  ['down', 'move down'],
	  ['up', 'move up']
	]
	
	module.exports = {
	  handleInput: function(sock) {
	    _inputSetup.forEach(function(inputs) {
	      if(key.isPressed(inputs[0]) && !Store.gameIsOver()) {　
	        Store.getSock().emit(inputs[1]);
	      }
	    });
	  }
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Constants = __webpack_require__(1);
	
	var _positions = [];
	for (var i = 0; i < Constants.PLAYER_TOTAL; i++) { _positions.push([0,0]); }
	
	var _sock,
	    _playerIdx,
	    _zombieIdxs = {},
	    _gameOver = false;
	
	function setSock(sock) { _sock = sock; }
	
	function setPlayerIdx(idx) { _playerIdx = playerIdx; }
	
	function setSocketListeners() {
	  setPositionReciever();
	  setPlayerIndexListener();
	  setGameoverListener();
	  setZombieStatusListener();
	}
	
	function setPositionReciever() {
	  _sock.on('position update', updatePositions);
	
	  function updatePositions(posArr) {
	    posArr.forEach((pos, idx) => { _positions[idx] = posArr[idx]; });
	  }
	}
	
	function setPlayerIndexListener() {
	  _sock.on('register player number', (idx) => { _playerIdx = idx; });
	}
	
	function setGameoverListener() {
	  _sock.on("game over", () => { _gameOver = true; })
	}
	
	function setZombieStatusListener() {
	  _sock.on("Is a Zombie", (idx) => { _zombieIdxs[idx] = true; });
	}
	
	module.exports = {
	  init: function (sock) {
	    _sock = sock;
	    setSocketListeners();
	  },
	
	  reset: function() {
	    _positions = [];
	    for (var i = 0; i < Constants.PLAYER_TOTAL; i++) { _positions.push([0,0]); }
	
	    _playerIdx = undefined,
	    _zombieIdxs = {},
	    _gameOver = false;
	  },
	
	  getPlayerIdx : function () { return _playerIdx;          },
	  getPositions : function () { return _positions;          },
	  getZombieIdxs: function () { return _zombieIdxs;         },
	  getSock      : function () { return _sock;               },
	  gameIsOver   : function () { return _gameOver;           },
	  readyToRender: function () { return _playerIdx !== null; }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Store     = __webpack_require__(4),
	    Constants = __webpack_require__(1);
	
	function render(ctx, halfWidth, halfHeight) {
	  var positions = Store.getPositions(),
	      playerIdx = Store.getPlayerIdx();
	
	  var translatedX = -positions[playerIdx][0] + halfWidth,
	      translatedY = -positions[playerIdx][1] + halfHeight;
	
	  if(Store.gameIsOver()) {
	    ctx.font = "48px serif";
	    ctx.strokeText("GAME OVER", halfWidth - 150, halfHeight);
	  }
	
	  ctx.translate(translatedX, translatedY);
	  renderBoundary(ctx);
	  renderPlayers(positions, ctx);
	  ctx.translate(-translatedX, -translatedY);
	}
	
	function renderPlayers(positions, ctx) {
	  var zombieIdxs = Store.getZombieIdxs();
	
	  Store.getPositions().forEach(function(pos, idx) {
	    if(zombieIdxs[idx]) { ctx.strokeStyle = 'green'; }
	
	    ctx.beginPath();
	    ctx.arc(pos[0], pos[1], 15, 0, 2 * Math.PI, false);
	    ctx.stroke();
	
	    if(zombieIdxs[idx]) { ctx.strokeStyle = 'black';}
	  });
	}
	
	function renderBoundary(ctx) { ctx.strokeRect(-500, -500, 1000, 1000); }
	
	module.exports = {
	  renderCanvasEl: function (ctx, halfWidth, halfHeight) {
	    ctx.clearRect(0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);
	    render(ctx, halfWidth, halfHeight);
	  }
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Renderer = __webpack_require__(7);
	var Store = __webpack_require__(8);
	var InputHandler = __webpack_require__(9);
	var sock;
	
	var MatchmakingScript = {
	  init: function (sock) {
	    Store.initialzeDataReceivers(sock);
	    InputHandler.init(sock);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Store = __webpack_require__(8);
	var InputHandler = __webpack_require__(9);
	var Constants = __webpack_require__(1);
	
	var MatchmakingRenderer = {
	  render: function (ctx) {
	    ctx.clearRect(0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);
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
/* 8 */
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
	  _data = data;
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Constants = __webpack_require__(1);
	
	var _cursorPos = [0, 0];
	var _readyToMoveCursor = true;
	var _readyToChooseGame = true;
	var _sock;
	
	module.exports = {
	  init: function (sock) {
	    _sock = sock;
	  },
	
	  handleInput: function () {
	    this.handleCursorScroll();
	    this.handleGameSelection();
	  },
	
	  handleCursorScroll: function() {
	    if(_readyToMoveCursor) {
	      scrollOnInput();
	    }
	  },
	
	  handleGameSelection: function() {
	    var idx = this.selectedGameIdx();
	    if(key.isPressed('enter') && _readyToChooseGame) {
	      _sock.emit('select game', { gameIdx: idx });
	      _readyToChooseGame = false;
	    }
	  },
	
	  selectedGameIdx: function () {
	    return (
	      _cursorPos[0] * Math.floor(Constants.GAME_TOTAL / 2) + _cursorPos[1]
	    );
	  }
	}
	
	var directionsAndCBs = [
	  ["right", scrollRight],
	  ["left", scrollLeft],
	  ["up", scrollUp],
	  ["down", scrollDown]
	];
	
	function scrollOnInput() {
	  for (var i = 0; i < directionsAndCBs.length; i++) {
	    var direction = directionsAndCBs[i][0];
	    var cb = directionsAndCBs[i][1];
	
	    if(key.isPressed(direction)) {
	      cb();
	      _readyToMoveCursor = false;
	
	      setTimeout(function() {
	        _readyToMoveCursor = true
	      }, Constants.MM_SCROLL_COOLDOWN);
	      break;
	    }
	  }
	}
	
	function scrollRight() {
	  _cursorPos[1] = (_cursorPos[1] - 1) % Math.floor(Constants.GAME_TOTAL / 2);
	
	  if(_cursorPos[1] === -1) {
	    _cursorPos[1] = 1;
	  }
	}
	
	function scrollLeft() {
	  _cursorPos[1] = (_cursorPos[1] + 1) % Math.floor(Constants.GAME_TOTAL / 2);
	}
	
	function scrollUp() {
	  _cursorPos[0] = (_cursorPos[0] + 1) % 2;
	}
	
	function scrollDown() {
	  _cursorPos[0] = (_cursorPos[0] - 1) % 2;
	
	  if(_cursorPos[0] === -1) {
	    _cursorPos[0] = Math.floor(Constants.GAME_TOTAL / 2) - 1;
	  }
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Renderer = __webpack_require__(11);
	var Store = __webpack_require__(12);
	
	module.exports = {
	  init: function (sock) { Store.initialize(sock); },
	
	  run: function(ctx) {
	    var intervalId = setInterval(function () {
	      Renderer.render(ctx);
	    }, 1000 / 30);
	
	    return intervalId;
	  }
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Constants = __webpack_require__(1);
	var Store = __webpack_require__(12);
	
	var PurgatoryRenderer = {
	  render: function (ctx) {
	    var playerTotal = Store.getPlayerTotal();
	
	    ctx.clearRect(0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);
	    ctx.fillText("This is the Purgatory Component", 70, 50);
	    ctx.fillText("Player Count: " + playerTotal, 70, 100);
	    ctx.fillText("Players needed: " + (Constants.PLAYER_TOTAL - playerTotal), 70, 150);
	  }
	}
	
	module.exports = PurgatoryRenderer;


/***/ },
/* 12 */
/***/ function(module, exports) {

	var _playerTotal = 0;
	
	module.exports = {
	  initialize: (sock) => { sock.on('purg update', setPlayerTotal); },
	
	  getPlayerTotal: () => { return _playerTotal; }
	};
	
	function setPlayerTotal(data) {
	  _playerTotal = data.playerTotal;
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	var _modules = [];
	
	module.exports = {
	  addModules: function (modules) {
	    for (var i = 0; i < modules.length; i++) {
	      _modules.push(modules[i]);
	      _modules[i].init();
	    }
	  }
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var IDRegulator = __webpack_require__(15);
	
	function ClientModule(script, sockSignalString, sock, ctx) {
	  this.script = script;
	  this.signalString = sockSignalString;
	  this.sock = sock;
	  this.ctx = ctx;
	}
	
	ClientModule.prototype.init = function () {
	  var signal    = this.signalString,
	      runScript = this.runScript.bind(this);
	
	  this.sock.on(signal, runScript);
	}
	
	ClientModule.prototype.runScript = function (script) {
	  if(this.signalString === 'To Game') { debugger; }
	  IDRegulator.clearAllIntervals();
	  this.script.init(this.sock);
	  //NOTE Should I clear sock listeners when leaving a module???
	  var intervalId = this.script.run(this.ctx);
	  IDRegulator.store(intervalId);
	};
	
	module.exports = ClientModule;


/***/ },
/* 15 */
/***/ function(module, exports) {

	var _ids = [];
	
	var Regulator = {
	  clearAllIntervals: function () {
	    while(_ids.length > 0) {
	      clearInterval(_ids.pop());
	    }
	  },
	
	  store: function (id) {
	    _ids.push(id);
	  }
	};
	
	window.addEventListener("beforeunload", (e) => {
	  // TODO CLEAR INTERVALS
	  Regulator.clearAllIntervals();
	});
	
	module.exports = Regulator;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map