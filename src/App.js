import React, {useEffect,useState} from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import Home from './component/home';
import Login from './component/login';
import Register from './component/register';
import Header from './component/header';
import Axios from 'axios';
import {APIURL} from './supports/UrlApi';
import {connect} from 'react-redux';
import {Userregister2} from './redux/actions'
import Verified from './component/verified';



function App(props) {

  const [loading,setloading]=useState(true)


  useEffect(()=>{
    const userid=localStorage.getItem('userid')
    if(userid){
      Axios.get(`${APIURL}/users/keeplogin/${userid}`)
      .then((res)=>{ 
        props.Userregister2(res.data)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setloading(false)
      })
    }else{
      setloading(false)
    }
  },[])

  if(loading){
    return <div>Loading.....</div>
  }
  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/verified' exact component={Verified}/>
      </Switch>
    </div>
  );
}

export default connect(null,{Userregister2}) (App);
