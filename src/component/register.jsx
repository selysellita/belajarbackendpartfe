import React, { Component } from 'react';
import Axios from 'axios'
import { APIURL } from '../supports/UrlApi';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {userRegister,Userregister2} from './../redux/actions'


class Register extends Component {
    state = {
        username:'',
        password:'',
        email:''    
    }

    onRegisinput=(e)=>{
        console.log(e.target.name)
        this.setState({[e.target.name]:e.target.value}) //this.setstate({["username"]:apa yang diketik})
    }

    onRegister=()=>{
        var data={
            username:this.state.username,
            password:this.state.password,
            email:this.state.email
        }
        // this.props.userRegister(data)
        Axios.post(`${APIURL}/users/register`,data)
        .then((res)=>{
            console.log(res.data)
            localStorage.setItem('userid',res.data.iduser)
            this.props.Userregister2(res.data)
        }).catch((err)=>{
            console.log(err)
            alert(err)
        })
    }
    render() {
        if(this.props.username){
            return <Redirect to='/'/>
        }
        return (
            <div className='d-flex justify-content-center align-items-center' style={{height:'80vh'}}>
                <div>
                    <h2>Register</h2>
                    <h5>Username :</h5>
                    <input type="text" placeholder='username' value={this.state.username} onChange={this.onRegisinput} name='username'/>
                    <h5>Email :</h5>
                    <input type="text" placeholder='Email' value={this.state.email} onChange={this.onRegisinput} name='email'/>
                    <h5>Password :</h5>
                    <input type="password" placeholder='password' value={this.state.password} onChange={this.onRegisinput} name='password'/>
                    <br/>
                    <button onClick={this.onRegister}>
                        REGISTER
                    </button>
                </div>
            </div>
          );
    }
}

const MapstateToProps=(state)=>{
    return{
        username: state.Auth.username,
        loading: state.Auth.loading,
        // error: state.Auth.error 
    }
}


export default connect(MapstateToProps,{userRegister,Userregister2})(Register);