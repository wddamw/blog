import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch}  from 'react-router-dom'
import Login from './Login'
import Index from './Index'

function Main() {
    const PrivateRoute = ({component:Component,...rest}) => {
        return (
            <Route
                {...rest}
                render={props =>
                    window.localStorage.getItem('openId') ? (
                    <Component {...props} />
                    ) : (
                    <Redirect
                        to={{
                        pathname: "/login",
                        state: { from: props.location }
                        }}
                    />
                    )
                }
            />
        )
    }
    return(
        <Router>
            <Switch>
                <Route path='/login' exact component={Login}/>
                <PrivateRoute path='/index' component={Index}/>
                <Redirect to="/login"/>
            </Switch>
        </Router>
    )
}

export default Main