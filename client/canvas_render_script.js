var Constants = require('../constants');

var canvas = document.getElementById("canvas");
    canvas.width  = Constants.CANVAS_WIDTH;
    canvas.height = Constants.CANVAS_HEIGHT;

var ctx    = canvas.getContext("2d"),
    sock   = io();

var GameScript  = require('./game_logic/game_script.js'),
    MMScript    = require('./matchmaking_logic/matchmaking_script.js'),
    PurgScript  = require('./purgatory/purgatory_script.js');

var ModuleRunner = require('./client_module/module_runner'),
    ClientModule = require('./client_module/client_module');

ModuleRunner.addModules([
  new ClientModule(MMScript  , 'To Matchmaking', sock, ctx),
  new ClientModule(PurgScript, 'To Purgatory'  , sock, ctx),
  new ClientModule(GameScript, 'To Game'       , sock, ctx)
]);
