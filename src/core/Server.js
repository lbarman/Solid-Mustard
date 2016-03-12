import { Log } from './Log.js';
import ClientHandle from './ClientHandle.js';
import Timer from './Timer.js';

export default class {
  constructor(server) {
    Log.info('Hello from default server');
    this._clients = [];

    this._timer = new Timer(() => this.updateClients());
    this._timer.setInterval(100);

    this.onCreate();

    server.io.on('connection', (socket) => {
      var client = new ClientHandle(socket);
      this._clients.push(client);
      this.onClientConnect(client);
    });

    this._timer.start();
  }

  /**
    * Updates the state of connected clients
    */
  updateClients() {
    for (let c of this._clients) {
      c.updateClient();
    }
  }

  onCreate() {}

  onClientConnect(client) {}
}
