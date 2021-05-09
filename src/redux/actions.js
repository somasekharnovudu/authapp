import actionTypes from './actionTypes';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


export const doLogin = (user_name, password) => (dispatch) => {
    dispatch(setLoading(true))
    const obj = { user_name, password };
    axios.post('http://localhost:4000/login', obj).then((resp) => {
        localStorage.setItem('access-token', resp.data.token);
        dispatch(setAuth(true))
        dispatch(setLoading(false))
    }).catch(err => {
        alert(err.response.data.message);
        dispatch(setAuth(false))
        dispatch(setLoading(false))
    })
}

export const checkExpiry = () => (dispatch) => {
    try {
        let authToken = localStorage.getItem('access-token');
        if (authToken && authToken !== "undefined") {
            var flag = false
            const data = jwtDecode(authToken);
            const expiry = data.exp;
            const dateNow = Math.floor(Date.now() / 1000);
            if (expiry > dateNow) {
                flag = true;
            }
        }
        dispatch(setAuth(flag))
    } catch (err) {
        alert('Unable to Login');
        dispatch(setAuth(false))
    }
}


export const setAuth = (isAuth) => (dispatch) => {
    isAuth === false && localStorage.removeItem('access-token');
    dispatch({ type: actionTypes.SETAUTH, isAuth })
}

export const setLoading = (isLoading) => ({ type: actionTypes.SETLOADING, isLoading })