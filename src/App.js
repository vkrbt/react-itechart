import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, Nav, Grid, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from './actions/login';

class App extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.isLoggedIn === nextProps.isLoggedIn) {
      return true;
    }
    return false;
  }
  logout = () => {
    this.props.logout();
    browserHistory.push('/login');
  }
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={'/'}>
                iTechArt
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {this.props.user.isLoggedIn ?
              <div>
                <Nav>
                  <LinkContainer to={'/new-quiz'}>
                    <NavItem>Create Quiz</NavItem>
                  </LinkContainer>
                  <LinkContainer to={'/my-quizzes'}>
                    <NavItem>My Quizzes</NavItem>
                  </LinkContainer>
                  {
                    this.props.user.isAdmin ?
                      <LinkContainer to={'/users'}>
                        <NavItem>Users</NavItem>
                      </LinkContainer>
                      : null
                  }
                </Nav>
                <Navbar.Text pullRight>
                  Hello, {this.props.user.login}
                  <Navbar.Link onClick={this.logout}> Logout</Navbar.Link>
                </Navbar.Text>
              </div>
              :
              <Nav pullRight>
                <LinkContainer to={'/login'}>
                  <NavItem>Login</NavItem>
                </LinkContainer>
                <LinkContainer to={'/register'}>
                  <NavItem>Register</NavItem>
                </LinkContainer>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
        <Grid bsClass="container">
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.loginReducer,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
