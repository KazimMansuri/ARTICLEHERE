

import React,{useState, useEffect} from 'react'
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';



function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setLogin] = useState(true)
    let history = useHistory()


    useEffect(() => {
        if(token['mytoken']) {
            history.push('/articles')
        }
    }, [token])
    



    const loginBtn = () => {
        APIService.LoginUser({username, password})
        .then(resp => setToken('mytoken',resp.token))
        .catch(error => console.log(error))

    }


    const RegisterBtn = () => {
        APIService.RegisterUser({username, password})
        .then(()=>loginBtn())
        .catch(error => console.log(error))



    }
    return (
        <div className='App'>

            <h3 className='text-warning'>ARTICLEHERE </h3>

            <hr/>

            <br/>
            <br/>
            {isLogin ? <h1>Please Login</h1> : <h1>Please Register</h1>}
            

            <br/>
            <br/>


            <div className='mb-3'>

            <label htmlFor='username' className='form-label'>username : </label>
            <input type='text' className='form-control' id='username' placeholder='Please Enter Username'
            value = {username} onChange={e => setUsername(e.target.value)}/>


            <label htmlFor='password' className='form-label'>Password : </label>
            <input type='password' className='form-control' id='password' placeholder='Please Enter Password'
            value = {password} onChange={e => setPassword(e.target.value)}/>


            </div>

            {isLogin ? <button className='btn btn-primary' onClick={loginBtn}>Login</button>
             : <button className='btn btn-primary' onClick={RegisterBtn}>Register</button>}
            


            <div className='mb-3'>
                <br/>
                {isLogin ? <h5> If You Don't Have Account,Please <button className='btn btn-primary' onClick={() => setLogin(false)}>Register</button>Here</h5>

                : <h5>If You Have Account, Please <button className='btn btn-primary' onClick={() => setLogin(true)}>LogIn</button>Here</h5>

                }



            </div>

        </div>
    )
}

export default Login
