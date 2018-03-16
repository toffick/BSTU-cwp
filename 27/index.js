import di from './loader';
import app from './AppManager';
import config from 'config';

(async function () {
  const container = di();
  const server = await app(container);

  server.listen(config.app.port, () => console.log('Server running'));
})();

import hal from 'hal';

var resource = new hal.Resource({name: 'Harry'}, '/harry');
resource.link('hello', '/harry/hello');
console.log(resource.toJSON());
