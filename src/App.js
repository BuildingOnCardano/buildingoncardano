import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import DashboardPage from 'pages/DashboardPage';
import ProjectsPage from 'pages/ProjectsPage';
import ProjectDetailsPage from 'pages/ProjectDetailsPage';
import MyProjectsPage from 'pages/MyProjectsPage';
import MyProjectsAddEditPage from 'pages/MyProjectsAddEditPage';
import VerifyEmail from 'pages/VerifyEmail';
import AllProjects from 'pages/AllProjects';
import AllSales from 'pages/AllSales';
import PromoteAppPage from 'pages/PromoteAppPage';
import TermsAndPolicy from 'pages/TermsAndPolicy';
import ResetPasswordPage from 'pages/ResetPasswordPage';
import { createBrowserHistory } from "history";
import NFTsPage from 'pages/NFTsPage';

import GA4React from "ga-4-react";
const ga4react = new GA4React("UA-201791504-1");

ga4react.initialize();

const getBasename = () => {
  return `/${process.env.PUBLIC_URL}`;
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

var hist = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      // <BrowserRouter basename={getBasename()}>
      <HashRouter basename={getBasename()}>

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

          <LayoutRoute
            exact
            path="/signout"
            layout={EmptyLayout}
            component={props => (
              <AuthPage {...props} authState={STATE_LOGIN} />
            )}
          />

          <LayoutRoute
            exact
            path="/resetpassword"
            layout={EmptyLayout}
            component={props => (
              <ResetPasswordPage {...props} authState={STATE_LOGIN} />
            )}
          />




          <Route path="/verify/:verifycode" component={props => (
            <VerifyEmail {...props} />
          )} />


          <MainLayout breakpoint={this.props.breakpoint}>
            <React.Suspense fallback={<PageSpinner />}>
              <Route exact path="/" render={(props) => <DashboardPage {...props} />} />

              <Route exact path="/allprojects" render={(props) => <AllProjects {...props} />} />
              <Route exact path="/allsales" render={(props) => <AllSales {...props} />} />

              <Route exact path="/termsandpolicy" render={(props) => <TermsAndPolicy {...props} />} />

              {/* <Route exact path="/nfts" render={(props) => <NFTsPage {...props} />} /> */}
              

              {/* PROJECT TYPES PAGES */}
              <Route path="/defi" render={(props) => <ProjectsPage {...props} projectType="defi" />} />
              <Route path="/subscriptions" component={() => <ProjectsPage projectType="subscriptions" />}></Route>
              <Route path="/tooling" render={(props) => <ProjectsPage {...props} projectType="tooling" />} />
              <Route path="/wallet" render={(props) => <ProjectsPage {...props} projectType="wallet" />} />
              <Route path="/data" render={(props) => <ProjectsPage {...props} projectType="data" />} />
              <Route path="/dex" render={(props) => <ProjectsPage {...props} projectType="dex" />} />
              <Route path="/cross-chain" render={(props) => <ProjectsPage {...props} projectType="cross-chain" />} />
              <Route path="/gaming" render={(props) => <ProjectsPage {...props} projectType="gaming" />} />
              <Route path="/oracle" render={(props) => <ProjectsPage {...props} projectType="oracle" />} />
              <Route path="/stablecoin" render={(props) => <ProjectsPage {...props} projectType="stablecoin" />} />
              <Route path="/infrastructure" render={(props) => <ProjectsPage {...props} projectType="infrastructure" />} />
              <Route path="/catalyst" render={(props) => <ProjectsPage {...props} projectType="catalyst" />} />

              <Route path="/Telcom" render={(props) => <ProjectsPage {...props} projectType="Telcom" />} />
              <Route path="/Gambling" render={(props) => <ProjectsPage {...props} projectType="Gambling" />} />
              <Route path="/Payment" render={(props) => <ProjectsPage {...props} projectType="Payment" />} />
              <Route path="/nft" render={(props) => <ProjectsPage {...props} projectType="nft" />} />
              <Route path="/NFT Platform" render={(props) => <ProjectsPage {...props} projectType="NFT Platform" />} />
              <Route path="/NFT Marketplace" render={(props) => <ProjectsPage {...props} projectType="NFT Marketplace" />} />
              <Route path="/NFT Lending" render={(props) => <ProjectsPage {...props} projectType="NFT Lending" />} />

              <Route path="/Charity" render={(props) => <ProjectsPage {...props} projectType="Charity" />} />
              <Route path="/Forex" render={(props) => <ProjectsPage {...props} projectType="Forex" />} />
              <Route path="/Lending" render={(props) => <ProjectsPage {...props} projectType="Lending" />} />
              <Route path="/Launch Pad" render={(props) => <ProjectsPage {...props} projectType="Launch Pad" />} />
              <Route path="/Cloud Storage" render={(props) => <ProjectsPage {...props} projectType="Cloud Storage" />} />

              <Route path="/application" component={() => <ProjectsPage projectType="application" />}></Route>


              <Route path="/projectdetails/:projectname" render={(props) => <ProjectDetailsPage {...props} />} />



              <Route path="/myprojects" render={(props) => <MyProjectsPage {...props} />} />
              <Route path="/addproject" render={(props) => <MyProjectsAddEditPage {...props} action="add" />} />
              <Route path="/editproject/:projectname" render={(props) => <MyProjectsAddEditPage {...props} action="edit" />} />


              <Route path="/promote" render={(props) => <PromoteAppPage {...props} action="add" />} />


              {/* <Route path="/login-modal" component={AuthModalPage} /> */}








            </React.Suspense>
          </MainLayout>
          <Redirect to='/' />
        </Switch>
        {/* </GAListener> */}


        {/* </BrowserRouter> */}
      </HashRouter>
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
