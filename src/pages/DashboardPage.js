import Page from 'components/Page';
import React from 'react';
import ReactGA from 'react-ga';
import {
  Card,
  Col,
  Row,
  Table,
  Button,
  Nav,
  Navbar
} from 'reactstrap';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrl, getAllProjects, getProjectsStats } from '../assets/services';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, TableHead, TableBody, TableContainer } from '@material-ui/core';
import "../styles/styles.css";
import SearchInput from 'components/SearchInput';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { removeUserSession } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

ReactGA.initialize('G-GHF73S719G');
ReactGA.pageview(window.location.pathname + window.location.search);

const width = window.innerWidth;

class DashboardPage extends React.Component {
  state = {
    projects: null,
    loading: true,
    totalProjects: '',
    projectTypesAndCount: [],
    smallScreen: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    //handle signout
    if (!isEmpty(this.props.signout) && this.props.signout == 'true') {
      removeUserSession();
      this.props.signout = false;
    }

    if (width < 600) {
      this.setState({ smallScreen: true });
    }

    this.getProjectsStats();
    this.getAllProjects();
  }

  async getAllProjects() {
    try {
      var response = await fetch(baseUrl + getAllProjects);
      const data = await response.json();
      this.setState({ projects: data, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  async getProjectsStats() {
    try {
      var response = await fetch(baseUrl + getProjectsStats);
      const data = await response.json();
      this.setState({ totalProjects: data.totalProjects, projectTypesAndCount: data.projectTypesAndCount });
      this.state.projectTypesAndCount = data.projectTypesAndCount;
    } catch (error) {
      console.log(error)
    }
  }


  render() {

    return (
      <Page
        className="DashboardPage"

      // breadcrumbs={[{ name: '/', active: true }]}
      >

        {/* <div><p><b>Total Projects: </b>{this.state.totalProjects}</p></div>*/}
        <div>

          {this.state.loading ? <div><CircleLoader loading={this.state.loading} css={override} size={100} /></div>
            :


            <Row className="justify-content-md-center">
              <Col lg={5} >
                <SearchInput projects={this.state.projects} />
              </Col>
            </Row>
          }
        </div>

        <div className="my-auto"><hr />

          <Col>
            <Row className="justify-content-md-center">
              {this.state.loading ? <div><CircleLoader loading={this.state.loading} css={override} size={100} /></div>
                :
                <div>
                  {this.state.projectTypesAndCount.map(function (item, index) {
                    return (
                      <Button className="btn-tag">
                        <Link to={{ pathname: '/' + item.projectType }}>
                          {item.projectType} ({item.projectCount})
                                </Link>
                      </Button>
                    )
                  })}
                </div>
              }
            </Row>
          </Col>

          <hr />
        </div>

        {this.state.loading ? <div><CircleLoader loading={this.state.loading} css={override} size={100} /></div>
          :
          <Col>
            <br />
            <h2>Latest Projects Added</h2>
            <br />
            <Card>

              <TableContainer component={Paper}>
                <Table >
                  <TableHead>
                    {this.state.smallScreen ?
                      <TableRow>
                        <TableCell ><h2>Project</h2></TableCell>
                        <TableCell ><h2>Type</h2></TableCell>
                      </TableRow >
                      :
                      <TableRow >
                        {/* <TableCell></TableCell> */}
                        <TableCell><h2>Project</h2></TableCell>
                        <TableCell><h2>Type</h2></TableCell>
                        <TableCell><h2>Token Type</h2></TableCell>
                        <TableCell><h2>Ticker</h2></TableCell>
                        <TableCell><h2>Stage</h2></TableCell>
                      </TableRow >}

                  </TableHead>
                  <TableBody>

                    {this.state.smallScreen ?
                      this.state.projects.map(function (item, index) {
                        return (
                          <TableRow component={Link} to={{ pathname: '/projectdetails/' + item.name, state: { projectDetails: item } }}>
                            <TableCell><p>{item.imageUrl != null && item.imageUrl.includes('http') && (<img
                              src={item.imageUrl}
                              className="rounded"
                              style={{ width: 30, height: 30 }}
                            />)}    {item.name}</p></TableCell>
                            <TableCell><p>{item.type}</p></TableCell>

                          </TableRow >
                        )
                      })

                      :
                      this.state.projects.map(function (item, index) {
                        if (index < 10) {
                          return (
                            <TableRow component={Link} to={{ pathname: '/projectdetails/' + item.name, state: { projectDetails: item } }} >
                              {/* <td scope="row">{item.id}</td> */}
                              {/* <TableCell width="10%"><h4>{item.imageUrl != null && item.imageUrl.includes('http') && (<img
                                src={item.imageUrl}
                                className="rounded"
                                style={{ width: "10vh", height: "10vh" }}
                              />)} </h4></TableCell> */}
                              <TableCell><p>{item.imageUrl != null && item.imageUrl.includes('http') && (<img
                                src={item.imageUrl}
                                className="rounded"
                                style={{ width: "5vh", height: "5vh", marginRight: "10px" }}
                              />)}{item.name}</p></TableCell>
                              <TableCell><p>{item.type}</p></TableCell>
                              <TableCell><p>{item.tokenType}</p></TableCell>
                              <TableCell><p>{item.ticker}</p></TableCell>
                              <TableCell><p>{item.stage}</p></TableCell>
                            </TableRow >
                          )
                        }
                      })}
                  </TableBody >
                </Table>
              </TableContainer>

            </Card>



          </Col>}
      </Page>
    );
  }
}
export default DashboardPage;
