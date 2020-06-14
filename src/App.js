import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PlanComponent from './components/plan/PlanComponent';
import LiabilityComponent from './components/liability/LiabilityComponent';
import IncomeComponent from './components/income/IncomeComponent';

import './App.css';

function SetupNav() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Home-Budget</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">

          <Nav.Link href="/plan">Plan</Nav.Link>
          <Nav.Link href="/liability">Liability</Nav.Link>
          <Nav.Link href="/income">Income</Nav.Link>
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
          <Route path='/plan' component={PlanComponent} />
          <Route path='/liability' component={LiabilityComponent} />
          <Route path='/income' component={IncomeComponent}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
