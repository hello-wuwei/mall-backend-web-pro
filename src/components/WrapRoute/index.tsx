import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import store from '@/store'
import { observer } from 'mobx-react'


const WrapRoute = (props: RouteProps) => {
  return store.loginUser.user ? <Route {...props} /> : <Redirect to="/login" />
}

export default observer(WrapRoute)