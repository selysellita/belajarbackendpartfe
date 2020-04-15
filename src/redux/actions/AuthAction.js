import Axios from 'axios'
import {APIURL} from './../../supports/UrlApi'

export const userRegister=(data)=>{
    return (dispatch)=>{
        dispatch({type:"AUTH_LOADING"})
        Axios.post(`${APIURL}/users/register`,data)
        .then((res)=>{
            dispatch({type:"USER_LOGIN_SUCCESS",payload:res.data})
        }).catch((err)=>{
            dispatch({type:"AUTH_SYSTEM_ERROR"})
        })
    }
}
export const Userregister2=(data)=>{
    return{
        type:"USER_LOGIN_SUCCESS",
        payload:data
    }
}