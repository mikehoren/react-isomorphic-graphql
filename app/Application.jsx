import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { getClient } from './client'
import { ApolloProvider } from 'react-apollo'
import { Router } from 'react-router'
import Routes from './routing/Routes'
import { getHistory } from './routing/history'
import Header from './components/Header/Header'
import { environment } from './lib'

import styles from './Application.css'

class Application extends React.PureComponent {

  componentWillMount() {
    this._client = getClient()
    this._history = getHistory(this.props.url);
  }

  render() {
    return (
      <Provider store={ store }>
        <ApolloProvider client={ this.props.client || this._client }>
          <div>
            <Router history={ this._history }>
              <div>
                <Header />
                <Routes history={ this._history } />
              </div>
            </Router>
          </div>
        </ApolloProvider>
      </Provider>
    )
  }

}

Application.defaultProps = {
  url: '',
}

Application.propTypes = {
  url   : PropTypes.string,
  data  : PropTypes.object,
  client: PropTypes.object,
}

export default Application