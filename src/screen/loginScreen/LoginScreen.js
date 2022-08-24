import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/auth.action'
import './_loginScreen.scss'
import {useHistory} from 'react-router-dom'

const LoginScreen = () => {

const dispatch = useDispatch()

const accessToken = useSelector(state=>state.auth.accessToken)

const handleLogin = () => {
dispatch(login())
}
const history = useHistory()

useEffect(() => {
  if(accessToken){
    history.push('/')
  }
},[accessToken,history])

  return (
    <div className='login'>
        <div className='login__container'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg' alt='' />
            <button onClick={handleLogin}>Login with google</button>
            <p>This Project is made using YOUTBE DATA API</p>
        </div>
    </div>
  )
}

export default LoginScreen