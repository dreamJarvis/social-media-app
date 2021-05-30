import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>
        <Router>
          <Container>
          <MenuBar />
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
            </Switch>
          </Container>
        </Router>
    </div>
  );
}

export default App;
