import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import Landing from './components/Landing/Landing';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Dashboard from './containers/Dashboard/Dashboard';
import CreateProfile from './containers/UserProfile/CreateProfile/CreateProfile';
import EditProfile from './containers/UserProfile/EditProfile/EditProfile';
import AddExperience from './containers/Credentials/Experience/AddExperience';
import AddEducation from './containers/Credentials/Education/AddEducation';
import Profiles from './containers/Profiles/Profiles';
import './App.css';
import Profile from './containers/Profile/Profile';
import Posts from './containers/Posts/Posts';
import NotFound from './components/NotFound/NotFound';
import store from './store';
import PrivateRoute from './hoc/PrivateRoute';
import Layout from './hoc/Layout';
import setAuthToken from './utils/setAuthToken';
import {
  setCurrentUser,
  logoutUser,
  clearCurrentProfile
} from './store/actions';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Layout>
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/edit-profile"
                    component={EditProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/add-experience"
                    component={AddExperience}
                  />
                  <PrivateRoute
                    exact
                    path="/add-education"
                    component={AddEducation}
                  />
                  <PrivateRoute exact path="/feed" component={Posts} />
                </Switch>
                <Route exact path="/not-found" component={NotFound} />
              </div>
            </Layout>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
