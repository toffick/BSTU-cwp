import di from './di';
import app from './AppManager';
import config from 'config';

(async function () {
  const container = di();
  const server = await app(container);

  server.listen(config.app.port, () => console.log('Server running'));
})();
