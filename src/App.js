import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Dashboard from './Pages/Dashboard/Dashboard'

function App() {
  let localLoggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact >
            {localLoggedInUser === null ? <Login /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path="/register" exact >
            {localLoggedInUser === null ? <Register /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path="/dashboard" exact >
            {localLoggedInUser === null ? <Redirect to="/" /> : <Dashboard />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
