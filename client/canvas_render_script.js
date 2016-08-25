var canvas = document.getElementById("canvas"),
    ctx    = canvas.getContext("2d"),
    sock   = io();

var GameScript  = require('./game_logic/game_script.js'),
    MMScript    = require('./matchmaking_logic/matchmaking_script.js'),
    PurgScript  = require('./purgatory/purgatory_script.js'),
    Constants   = require('./general_utils/constants');

var ModuleRunner = require('./general_utils/module_runner'),
    ClientModule = require('./general_utils/client_module');

    // NOTE PROBALY WRAP THIS IN A GIANT INIT METHOD
Constants.initDimensions(canvas);
sock.on('share game total', Constants.initGameTotal);
// NOTE END INIT WRAPPING

ModuleRunner.addModules([
  new ClientModule(MMScript, 'To Matchmaking', sock, ctx),
  new ClientModule(PurgScript, 'To Purgatory', sock, ctx),
  new ClientModule(GameScript, 'To Game', sock, ctx),
]);
