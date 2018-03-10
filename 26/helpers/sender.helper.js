import YAML from 'yamljs';

const ACCEPT_HANDLERS = {
  'application/yaml': (res, data) => {
    res.setHeader('content-type', 'application/yaml');
    res.send(YAML.stringify(data));
  },
  'application/json': (res, data) => {
    res.json(data);
  },
  '*/*': (res, data) => {
    res.json(data);
  }
};

export const send = (req, res, data) => {
  const accept = req.headers['accept'];
  const handler = ACCEPT_HANDLERS[accept];

  handler(res, data);
};
