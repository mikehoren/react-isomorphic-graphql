# react-isomorphic-graphql

A basic Isomorphic React Server using GraphQL I built for learning purposes.  This is not intended as a production-ready server. In the future I'd like to expand on this repo by bringing it closer to being a production ready example, improve the dev experience as well as add more GraphQL examples.  The isomorphic magic in this example happens in /bin.

To install and run:

```javascript
npm install nodemon -g
npm install node-foreman -g
npm install
npm start
```

To run tests:
```javascript
npm test
```

How does server-side rendering work in this example?
----------------------------------------------------

In this example with GraphQL each component is responsible for defining the data it needs to render. In each container view (in this case a page) a query is defined to describe this and connected to the component via apollo-react's HOC.  When it comes time to render a page on the server the component tree is rendered via react-apollo's method renderToStringWithData() which returns a promise that resolves with the markup to render.  

At the time this promise is resolved the apollo client has been hydrated with the required data to render this view and the component tree has been rendered with the requested data.  The component tree is then rendered to string via React-DOM and the data is extracted from apollo-client to be passed to the client.  The page is rendered in our ejs template and the response is sent.

The extracted data that was also passed to the client is used to rehydrate the apollo-client which is now in sync with the server and no additional requests are needed.

The queries used in this example come from a fake local api set up using GraphQL mocks in /server.

Server Tech
-----------

- Express (http server)
- node-foreman (running processes)
- nodemon (watcher for changed files)
- morgan (logging)
- Babel & airbnb preset (compilation)
- React-dom (rendering)
- React-Apollo/Apollo-client (rendering/data fetching)
- Apollo-server-express (GraphQL)
- Webpack (clientside bundle compilation)
- ejs (templating)
- Custom Modules
  - modules.exports babel transform
  - basic file change reloading using socketio

Client Tech
-----------

- React
- React-Redux
- React-Router
- Immutable (installed but not used in this example)
- Redux
- Reselect (installed but not used in this example)
- Redux-actions
- React-Apollo (GraphQL connected components)
- Apollo-Client (GraphQL client)
- Sass

Testing
-------

- Jest
- Enzyme (w/React 16 adapter)
- Sinon (installed but no needed for this demo)
