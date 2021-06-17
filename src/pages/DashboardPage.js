import Page from 'components/Page';
import React from 'react';
import ReactGA from 'react-ga';
import {
  Card,
  CardHeader,
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
import { baseUrl, getLatestProjects, getProjectsStats, liveProjectSales } from '../assets/services';
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
    salesData: null,
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
    this.getLiveSales();
    this.getAllProjects();
  }

  async getAllProjects() {
    try {
      var response = await fetch(baseUrl + getLatestProjects);
      const data = await response.json();
      this.setState({ projects: data, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  async getLiveSales() {
    try {
      var response = await fetch(baseUrl + liveProjectSales);
      const data = await response.json();
      this.setState({ salesData: data })
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
      >
        {this.state.loading ? <div><CircleLoader loading={this.state.statsloading} css={override} size={100} /></div>
          :
          <div>
            {/* <Row className="justify-content-md-center">
              <Col lg={5} >
                <SearchInput projects={this.state.projects} />
              </Col>
            </Row> */}


            <div className="my-auto"><hr />
              <Col>
                <Row className="justify-content-md-center">
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
                </Row>
              </Col>
              <hr />
            </div>


            <div>
              <Row>
                <Col>
                  <Card>
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <h3 className="mb-0">Latest Projects</h3>
                        <div className="col text-right">
                          <Button
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                          >
                            See all
                          </Button>
                        </div>
                      </Row>
                    </CardHeader>

                    <TableContainer component={Paper}>
                      <Table >
                        <TableHead className="thead-light">
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



                </Col>
                <Col>
                  <Card>
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <h3 className="mb-0">Live Sales</h3>
                      </Row>
                    </CardHeader>

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
                          {this.state.salesData.map(function (item, index) {
                            if (index < 10) {
                              return (
                                <div>
                                  {item.projectName}
                                </div>
                              )
                            }
                          })}
                        </TableBody >
                      </Table>
                    </TableContainer>

                  </Card>
                </Col>
              </Row>
            </div>
          </div>}

      </Page>
    );
  }
}
export default DashboardPage;
