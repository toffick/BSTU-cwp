var jwt = require('jsonwebtoken');


jwt.sign({ foo: 'bar' }, 'shhhh', { algorithm: 'RS256' }, function(err, token) {
    console.log(token,err);
});
