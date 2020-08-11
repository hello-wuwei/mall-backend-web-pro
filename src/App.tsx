import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom'
// import { hot } from 'react-hot-loader'
import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import history from './history'
import './style/common.less'
import { WrapRoute } from 'components'
import Login from '@/Login'
import Layout from '@/Layout'
import store from '@/store'
import { getSessionStorage } from '@/util'
moment.locale('zh-cn')

store.loginUser.setUser(getSessionStorage('loginInfo'))

const Spinner = () => {
  const style = { display: 'flex', justifyContent: 'center', marginTop: '20%' }
  return (
    <div style={style}>
      <Spin tip="加载中..." size="large" />
    </div>
  )
}

const config = {
  locale: zhCN
}

const App = () => {
  return (
    <ConfigProvider {...config}>
      <Router history={history}>
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/login" component={Login}/>
            <WrapRoute path="/" component={Layout}/>
          </Suspense>
        </Switch>
      </Router>
    </ConfigProvider>
  )
}

// export default hot(module)(App)
export default App