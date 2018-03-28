const Sequelize = require('sequelize');
const Promise = require('bluebird');
const express = require('express');
const graphqlHttp = require('express-graphql');
const graphqlTools = require('graphql-tools');
const fs = require('fs');

const config = require('./config');

const db = require('./models/index')(Sequelize, config);

const resolvers = require('./tnmt.graphql')(db);

const fillWithTestData = require('./models/test-data');

const app = express();

app.listen = Promise.promisify(app.listen).bind(app);

app.use('/', graphqlHttp({
    graphiql: true,
    schema: graphqlTools.makeExecutableSchema({
        typeDefs: fs.readFileSync('./schema.graphql').toString(),
        resolvers: resolvers
    }),
}));

(async function () {
  await fillWithTestData(db);

  await app.listen(config.port);

  console.log(`Server running at http://localhost:${config.port}`);
})();
