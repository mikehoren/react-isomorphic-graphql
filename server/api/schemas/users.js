const tools = require('graphql-tools')
const makeExecutableSchema = tools.makeExecutableSchema;
const addMockFunctionsToSchema = tools.addMockFunctionsToSchema;

const mocks = {

  String: () => 'It works!',
  Query: () => ({
    user: (root, args) => {
      return { id: args.id, name: 'Mike', avatar: 'http://us.battle.net/wow/static/images/wiki/profession/screenshots/engineering.jpg', location: 'Bay Area, CA' }
    },
    users: (root, args) => {
      return [
        {
          id: 1,
          name: 'Mike',
          location: 'Bay Area, CA',
          avatar: 'http://us.battle.net/wow/static/images/wiki/profession/screenshots/engineering.jpg',
        },
        {
          id: 2,
          name: 'Sarah',
          location: 'Kansas City, KS',
          avatar: 'http://us.battle.net/wow/static/images/wiki/profession/screenshots/engineering.jpg',
        },
        {
          id: 3,
          name: 'Charles',
          location: 'Boston, MA',
          avatar: 'http://us.battle.net/wow/static/images/wiki/profession/screenshots/engineering.jpg',
        }
      ]
    }
  }),
  User: () => ({ id: 1, name: 'Mike', avatar: 'http://us.battle.net/wow/static/images/wiki/profession/screenshots/engineering.jpg', location: 'Bay Area, CA' })

}

const typeDefs = `
  
  type Query {
    user(id: Int, name: String, avatar: String, location: String): User
    users: [User]
  }

  type User {
    id: Int
    name: String
    location: String
    avatar: String
  }

`

const schema = makeExecutableSchema({ typeDefs })

addMockFunctionsToSchema({ schema, mocks });

module.exports = schema