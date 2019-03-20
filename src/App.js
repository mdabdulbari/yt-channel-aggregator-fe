import React, { Component } from 'react';
import './App.css';
import Dashboard from './channel/Dashboard';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChannelDetails from './channel/ChannelDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                <Link to="/">YouTube Channel Aggregator</Link> 
              </Typography>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/channel" component={ChannelDetails} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
