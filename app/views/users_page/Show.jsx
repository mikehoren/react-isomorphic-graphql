import React from 'react'
import { connect } from 'react-redux'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  }
}

import styles from './Page.css'

export class Page extends React.PureComponent {

  render() {
    return (
      <div className="page">
        <p className="section-title">Users</p>
        { this.props.data.user && this.renderUsers() }
      </div>
    )
  }

  renderUsers() {
    return (
      <ul className="users-list">
        { [this.props.data.user].map( u => {
          return (
            <li key={ u.id }>
              <span>{ u.id }</span>
              <span><img src={ u.avatar } /></span>
              <span>{ u.name }</span>
              <span>{ u.location }</span>
            </li>
          )
        })}
      </ul>
    )
  }

}

export const query = gql`
  query UsersPageQuery($user_id: Int) {
    user(id: $user_id) {
      id
      location
      avatar
      name
    }
  }
`

const ConnectedPage = graphql(query, {
  options: (props) => ({
    variables: { user_id: props.match.params.id } 
  })
})(Page)

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedPage)