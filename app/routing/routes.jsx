import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router'
import IndexPage from '../views/index_page/Page'
import UsersPage, { query as usersQuery } from '../views/users_page/Page'
import UsersShowPage, { query as usersShowQuery } from '../views/users_page/Show'
import { getHistory } from './history'
import { environment } from '../lib'

export default props => {
  return (
    <Switch location={ props.history.location }>
      <Route path="/users/:id" component={ UsersShowPage } query={ usersShowQuery } />
      <Route path="/users" component={ UsersPage } query={ usersQuery } />
      <Route path="/" exact component={ IndexPage } />
      <Route path="*" component={ IndexPage } />
    </Switch>
  )
}