import { createBrowserHistory, createMemoryHistory } from 'history'
import { environment } from '../lib'

let history = null
// on the server each request needs it's own history instance
// on the client we need a singleton
const getHistory = (url) => {
  if(!environment.isServer() && history) {
    return history;
  }

  const config = {}

  if(url) {
    config.initialEntries = [url]
  }

  history = environment.isServer() ? createMemoryHistory(config) : createBrowserHistory()
  return history;
}

export { getHistory }