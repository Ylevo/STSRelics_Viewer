import React, { Component } from 'react';
import { Route } from 'react-router';
import { Container } from 'reactstrap';
import RelicsPage from './pages/RelicsPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/RequireAuth';
import { AuthContextProvider } from './contexts/AuthContext';
import "@fontsource/rubik"
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        <>
              <header>
                  <Container id="title_wrapper">
                      <img id="title_logo" src="img/logo.png" />
                      <div id="title">Slay the Spire Relics Viewer</div>
                  </Container>
              </header>
              <Container>
                  <AuthContextProvider>
                        <Route exact path='/' component={RelicsPage} />
                        <Route path='/admin' render={() => <RequireAuth> <AdminPage/> </RequireAuth> } />
                        <Route path='/login' component={LoginPage} />
                  </AuthContextProvider>
              </Container>
              <footer>
                  <Container id="github_rep">
                      <a href="https://github.com/Ylevo/STSRelics_Viewer">Github Repository</a>
                  </Container>
              </footer>
        </>
    );
  }
}