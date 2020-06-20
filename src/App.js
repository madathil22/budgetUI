import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ReactModalLogin from "react-modal-login";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PlanComponent from './components/plan/PlanComponent';
import LiabilityComponent from './components/liability/LiabilityComponent';
import IncomeComponent from './components/income/IncomeComponent';
import { googleConfig, facebookConfig } from './social';
import { GOOGLEAPI } from './api';


import './App.css';



class App extends Component {


  constructor() {
    super();
    this.state = {
      loginvisible: false,
      showModal: true,
      loading: false,
      error: null,
      loggeduser: {
        name: '',
        email: ''
      }
    }
  }

  openModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null,
      loginvisible: false
    });
  }

  onLoginSuccess(method, response) {
    console.log("logged successfully with " + method);
    var access_token = response.access_token;
    GOOGLEAPI.get(`oauth2/v1/userinfo?access_token=` + access_token).then(res => {
      this.setState({ loggeduser: { name: res.data.name, email: res.data.email } })
      this.closeModal();
    });
  }

  onLoginFail(method, response) {
    console.log("logging failed with " + method);
    this.setState({
      error: response
    });
  }


  startLoading() {
    this.setState({
      loading: true
    });
  }

  finishLoading() {
    this.setState({
      loading: false
    });
  }

  afterTabsChange() {
    this.setState({
      error: null
    });
  }

  componentDidMount() {
    //this.setState({ loginvisible: true })
  }

  render = () => {
    return (
      <div>
        <ReactModalLogin
          visible={this.state.loginvisible}
          onCloseModal={this.closeModal.bind(this)}
          loading={this.state.loading}
          error={this.state.error}
          tabs={{
            afterChange: this.afterTabsChange.bind(this)
          }}
          loginError={{
            label: "Couldn't sign in, please try again."
          }}
          registerError={{
            label: "Couldn't sign up, please try again."
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
          providers={{
            facebook: {
              config: facebookConfig,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              label: "Continue with Facebook"
            },
            google: {
              config: googleConfig,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              label: "Continue with Google"
            }
          }}
        />
        <Router>
          <div className="App">
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
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: {this.state.loggeduser.name}
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
            <Switch>
              <Route path='/plan' component={PlanComponent} />
              <Route path='/liability' component={LiabilityComponent} />
              <Route path='/income' component={IncomeComponent} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}


export default App;
