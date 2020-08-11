import React from 'react'
import styles from './index.module.less'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <div className={styles.login}>
      <div className="login-form">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login