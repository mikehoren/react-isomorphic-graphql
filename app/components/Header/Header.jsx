import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.css'

class Header extends React.PureComponent {

  render() {
    return (
      <header className="site-header clearfix">
        <h1><Link to="/"><img className="logo" src="/images/logo.png" /> React Isomorphic Server w/GraphQL</Link></h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </header>
    )
  }

}

export default Header