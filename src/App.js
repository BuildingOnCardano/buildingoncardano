import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';


import AuthModalPage from 'pages/AuthModalPage';
import ButtonGroupPage from 'pages/ButtonGroupPage';
import DashboardPage from 'pages/DashboardPage';
import ProjectsPage from 'pages/ProjectsPage';
import ProjectDetailsPage from 'pages/ProjectDetailsPage';
import ProjectAddPage from 'pages/ProjectAddPage';
import MyProjectsPage from 'pages/MyProjectsPage';
import MyProjectEditPage from 'pages/MyProjectEditPage';

import { getUser  } from 'utils/Common.js';
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};


const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        {/* <GAListener> */}
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                {/* <Route exact path="/" component={DashboardPage} /> */}
                <Route exact path="/" render={(props) => <DashboardPage {...props} />} />
                <Route exact path="/addproject" render={(props) => <ProjectAddPage {...props} />} />

                <Route exact path="/defi" render={(props) => <ProjectsPage {...props}   projectType="defi"/>} />
                <Route exact path="/application" render={(props) => <ProjectsPage {...props}   projectType="application"/>} />
                <Route exact path="/tooling" render={(props) => <ProjectsPage {...props}   projectType="tooling"/>} />
                <Route exact path="/wallet" render={(props) => <ProjectsPage {...props}   projectType="wallet"/>} />
                <Route exact path="/data" render={(props) => <ProjectsPage {...props}   projectType="data"/>} />
                <Route exact path="/nft" render={(props) => <ProjectsPage {...props}   projectType="nft"/>} />
                <Route exact path="/dex" render={(props) => <ProjectsPage {...props}   projectType="dex"/>} />

                <Route exact path="/projectdetails" render={(props) => <ProjectDetailsPage {...props} />} />
                <Route exact path="/myprojects" render={(props) => <MyProjectsPage {...props} />} />
                <Route exact path="/editmyproject" render={(props) => <MyProjectEditPage {...props} />} />

                <Route exact path="/login-modal" component={AuthModalPage} />
                <Route
                  exact
                  path="/button-groups"
                  component={ButtonGroupPage}
                />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        {/* </GAListener> */}
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
