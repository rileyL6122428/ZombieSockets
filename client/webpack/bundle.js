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
	var sock = io();
	
	var GameScript = __webpack_require__(1);
	var MMScript   = __webpack_require__(2);
	
	
	sock.on('To Matchmaking', runMatchMaking);
	var matchmakingIntervalID;
	function runMatchMaking() {
	  // if(gameIntervalID) {
	    // clearInterval(gameIntervalID);
	  // }
	  MMScript.init(sock);
	  matchmakingIntervalID = MMScript.run();
	}
	
	
	// NOTE DO NOT DELETE THE FOLLOWING!!!
	// sock.on('To Game', runGame);
	// var gameIntervalID;
	// function runGame() {
	//   clearInterval(matchmakingIntervalID);
	//   GameScript.init();
	//   gameIntervalID = GameScript.run();
	// }
	
	
	window.addEventListener("beforeunload", (e) => {
	  // TODO CLEAR INTERVALS
	  // clearInterval(renderID);
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

	var Renderer = __webpack_require__(4);
	var Store = __webpack_require__(5);
	var sock;
	
	var MatchmakingScript = {
	  init: function (s) {
	    sock = s;
	    Store.initialzeDataReceivers(sock);
	  },
	
	  run: function (ctx) {
	    var intervalId = setInterval(function() {
	      Renderer.render(ctx);
	
	      // setup an input register method
	    }, 1000 / 30);
	
	    return intervalId;
	  }
	};
	
	module.exports = MatchmakingScript;


/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	var MatchmakingRenderer = {
	  render: function (ctx) {
	    ctx.font = "48px serif";
	    ctx.strokeStyle = "#FF0000"
	    ctx.strokeText("Matchmaking Test", 200, 200);
	  }
	};
	
	module.exports = MatchmakingRenderer;


/***/ },
/* 5 */
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
	    debugger
	  },
	
	  getData: function() {
	    return _data;
	  }
	};
	
	function receiveData(data) {
	  debugger
	  _data = data;
	  console.log(data);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map