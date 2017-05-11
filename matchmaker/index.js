const program = require('commander');

program
    .version('1.0.0')
    .option('-p, --port <port>', 'specify the websocket port to listen to [9872]', 9872)
    .parse(process.argv);


const io = require('socket.io-client'),
      winston = require('winston'),
      config = require('./config.js');

winston.level = 'debug';
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true, 'label': 'matchmaker'});

const PORT = program.port;
const SERVICES = config.services;

const ROOMID = 'room1';

winston.info('Unichat matchmaker service');
winston.info('Listening on port ' + PORT);

let serviceSockets = [];
let presenceToUse = '';
let realtimeToUse = '';
for (var i=0; i < SERVICES.length; i++) {
    let _url = SERVICES[i].url;
    let _type = SERVICES[i].type;

    let _socketIOServer = io.connect(_url, {'forceNew': true});

    _socketIOServer.on('connect', () => {
        winston.debug('Connected to ' + _type + ' service at ' + _url);
        _socketIOServer.emit('register-matchmaker');
    });

    _socketIOServer.on('presence-find-partner', (cookieId) => {
        winston.debug('Finding partner for client with cookie: ' + cookieId);
        _socketIOServer.emit('matchmaker-send-to-room', cookieId, realtimeToUse.url, ROOMID);
        winston.debug('Sent client with cookie (' + cookieId + ') to room: ' + ROOMID);
    });

    serviceSockets.push(_socketIOServer);

    // Define the primary presence/realtime service that traffic is directed at
    if (_type == 'presence') {
        presenceToUse = {'socketIOServer': _socketIOServer, 'url': _url};
        winston.debug('Presence to use: ' + presenceToUse.url);
    }
    else {
        realtimeToUse = {'socketIOServer': _socketIOServer, 'url': _url};
        winston.debug('Realtime to use: ' + realtimeToUse.url);
    }
}