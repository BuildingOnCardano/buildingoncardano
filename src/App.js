import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import AuthPage from 'pages/AuthPage';

import GAListener from 'components/GAListener';
import React from 'react';

import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
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
import { createBrowserHistory } from 'history';
import Ecosystem from 'pages/Ecosystem';
import AllProjectTokens from 'pages/AllProjectTokens';
import NFTsPage from 'pages/NFTsPage';

import GA4React from 'ga-4-react';
const ga4react = new GA4React('UA-201791504-1');

ga4react.initialize();

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <GAListener>


          {/* <MainLayout breakpoint={this.props.breakpoint}> */}
          <Routes>



            {/* LOGIN & REGISTER */}
            <Route path="/login" element={<AuthPage props authState={STATE_LOGIN} />} />
            <Route path="/signup" layout={EmptyLayout} element={<AuthPage props authState={STATE_SIGNUP} />} />
            <Route path="/signout" layout={EmptyLayout} element={<AuthPage props authState={STATE_LOGIN} />} />
            <Route path="/resetpassword" layout={EmptyLayout} element={<ResetPasswordPage props authState={STATE_LOGIN} />} />
            <Route path="/verify">
              <Route path=":verifycode" element={<VerifyEmail props />} />
            </Route>


            <Route element={<MainLayout breakpoint={this.props.breakpoint} />}>
              <Route path="/" layout={MainLayout} element={<DashboardPage props />} />

              <Route path="/allprojects" element={<AllProjects props />} />
              <Route path="/ecosystem" element={<Ecosystem props />} />
              <Route
                path="/termsandpolicy"
                element={<TermsAndPolicy props />}
              />

              {/* PROJECT DETAILS PAGE */}
              <Route path="projectdetails">
                <Route
                  path=":projectname"
                  element={<ProjectDetailsPage props />}
                />
              </Route>

              {/* PROJECT TYPES PAGES */}
              <Route path="projects">
                <Route path=":projectType" element={<ProjectsPage props />} />
              </Route>

              {/* PROJECT MANAGEMENT */}
              <Route path="/myprojects" element={<MyProjectsPage props />} />
              <Route path="/addproject" element={<MyProjectsAddEditPage props action="add" />} />
              <Route path="/editproject">
                <Route path=":projectname" element={<MyProjectsAddEditPage props action="edit" />} />
              </Route>

              <Route path="/promote" element={<PromoteAppPage props />} />

            </Route>



          </Routes>
          {/* </MainLayout> */}

        </GAListener>
      </Router>
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
