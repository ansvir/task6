import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Home from "./components/home.component";
import Employees from "./components/employees.component";

class App extends Component {
  render() {
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
              Application
            </a>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/employees"} className="nav-link">
                  Employees
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/employees" component={Employees} />
            </Switch>
          </div>
        </div>
    );
  }
}

export default App;
