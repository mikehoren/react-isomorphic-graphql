const React          = require('react')
const ReactDOMServer = require('react-dom/server')
const Application    = require('../../app/Application.jsx').default;
const ReactApollo    = require('react-apollo')
const getClient      = require('../../app/client').getClient;

class Renderer {

  render(url) {
    const client = getClient();
    const App = <Application url={ url } client={ client } />
    return ReactApollo.renderToStringWithData(App)
      .then( html => {
        const data = client.extract()
        return Promise.resolve({ data, html })
      })
      .catch( err => {
        return Promise.resolve({ data: {}, html: '' })
      })
  }

}

module.exports = new Renderer()