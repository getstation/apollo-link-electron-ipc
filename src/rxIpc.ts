// rx-ipc-electron/lib/main can't be required in renderer process and the oppposite
// so we do conditional require here
// TODO: this could probably be moved in `rx-ipc-electron` itself
import { RxIpc } from 'rx-ipc-electron/lib/rx-ipc';
var isRenderer = require('is-electron-renderer') as Boolean;

let rxIpc;
if (isRenderer) {
  rxIpc = require('rx-ipc-electron/lib/renderer').default;
} else {
  rxIpc = require('rx-ipc-electron/lib/main').default;
}

export default rxIpc as RxIpc;

