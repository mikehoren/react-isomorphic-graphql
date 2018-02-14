const Apollo = require('apollo-server-express')
const path   = require('path')
const schema = require('./api/schemas/users')
const bodyParser = require('body-parser')

module.exports = app => {
  app.use('/api', bodyParser.json(), Apollo.graphqlExpress({ schema }));
  app.get('/graphiql', Apollo.graphiqlExpress({ endpointURL: '/api' })); // if you want GraphiQL enabled
}