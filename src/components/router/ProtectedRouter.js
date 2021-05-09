import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { checkExpiry } from '../../App';
import { setAuth, checkExpiry } from '../../redux/actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuth, checkExpiry, ...rest }) => {
    checkExpiry()
    return (
        <Route
            {...rest}
            render={props =>
                isAuth ? (<Component {...props} />) : (<Redirect to="/login" />)
            }
        />
    );
};
const mapStateToProps = ({ isAuth }) => ({
    isAuth
})
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ setAuth, checkExpiry }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);