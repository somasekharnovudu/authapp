import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import LoginComponent from './components/login/Login';
import jwtDecode from 'jwt-decode';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import HomeComponent from './components/home/Home'
import AboutComponent from './components/About/AboutComponent';
import PrivateRoute from './components/router/ProtectedRouter';
import { setAuth, setLoading, checkExpiry } from './redux/actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';




function App(props) {

  useEffect(() => {
    props.checkExpiry();
  }, [])

  useEffect(() => {
    props.isAuth == true ? props.history.push('/home') : props.history.push('/login')
    props.setLoading(false)
  }, [props.isAuth])


  return (
    <div className="wrapper">
      {props.isLoading && <div className="loadingContainer"><div className="loadingSpinner"></div></div>}
      <div className="App">
        {props.isAuth && (
          <div className="navContainer">
            <Link className='btn btn-default' to='/home'>Home</Link>
            <Link className='btn btn-default' to='/about'>About</Link>
            <button className="btn btn-danger" onClick={() => props.setAuth(false)}>Log Out</button>
          </div>
        )}
        < Switch >
          <PrivateRoute path='/home' exact component={HomeComponent} />
          <PrivateRoute path='/about' exact component={AboutComponent} />
          <Route path='/login' exact render={() => <LoginComponent />} />
        </Switch>
      </div>
    </div>
  )
}

const mapStateToProps = ({ isAuth, isLoading }) => ({
  isAuth, isLoading
})
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ setLoading, setAuth, checkExpiry }, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
