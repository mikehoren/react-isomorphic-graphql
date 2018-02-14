import React from 'react'
import { connect } from 'react-redux'

import styles from './Page.css'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

export class Page extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      show: false,
    }
  }

  render() {
    return (
      <div>
        <div className="banner">
          <button className="test-btn" onClick={ () => this.onClick() }>Test Clientside Code</button>
        </div>
        <p className="working-text">{ this.state.show && <span>Working!</span> }</p>
      </div>
    )
  }

  onClick() {
    this.setState({
      show: true,
    })
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Page)