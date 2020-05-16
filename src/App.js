import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TrendComponent from './components/trend/TrendComponent';
import LiabilityComponent from './components/liability/LiabilityComponent';
import EntryComponent from './components/entry/EntryComponent';

import './App.css';

function SetupNav() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Home-Budget</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">

          <Nav.Link href="/trend">Trend</Nav.Link>
          <Nav.Link href="/liability">Liability</Nav.Link>
          <Nav.Link href="/entry">Entry</Nav.Link>
          <Nav.Link href="/history">History</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <SetupNav />
        <Switch>
          <Route path='/trend' component={TrendComponent} />
          <Route path='/liability' component={LiabilityComponent} />
          <Route path='/entry' component={EntryComponent}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
