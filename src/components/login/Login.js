import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import { setAuth, setLoading, doLogin } from '../../redux/actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

const LoginComponent = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('')

    const resetForm = () => {
        setPassword('');
        setUserName('');
    }
    const performLogin = () => {
        if (userName && password) {
            props.doLogin(userName, password);
        } else {
            alert('Login Failed');
        }
        resetForm();
    }

    return (
        <div className="loginContainer">
            <div className="title">
                <p>Login</p>
            </div>
            <div className="formContainer">
                <div className="formController">
                    <label htmlFor="username" id="usernameLabel">User Name:</label>
                    <input type="text" id="username" value={userName} onChange={({ target }) => setUserName(target.value)} />
                </div>
                <div className="formController">
                    <label htmlFor="password" id="passwordLabel">Password:</label>
                    <input type="password" id="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <div className="buttonHolder">
                    <button className="btn btn-danger" onClick={performLogin}>Login</button>
                    <button className="btn btn-success" onClick={resetForm}>Reset</button>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = ({ isAuth, isLoading }) => ({
    isAuth, isLoading
})
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ setLoading, setAuth, doLogin }, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));