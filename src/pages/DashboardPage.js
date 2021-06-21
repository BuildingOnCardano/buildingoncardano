import Page from 'components/Page';
import React from 'react';
import ReactGA from 'react-ga';
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Table,
  Button,
  Nav,
  Navbar,
  CardText,
  CardTitle
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
import { Line, Bar, Pie } from "react-chartjs-2";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

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
    barChartData: null,
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


      var labels = [];
      var counts = [];
      data.projectTypesAndCount.forEach(element => {
        labels.push(element.projectType);
        counts.push(element.projectCount)
      });

      var chartData = {
        labels: labels,
        datasets: [
          {
            label: '# of Types',
            data: counts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(31,179,124, 0.6)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.4)',
              'rgba(144,14,249, 0.6)',
              'rgba(54, 162, 0, 0.8)',
              'rgba(255, 100, 86, 0.2)',
              'rgba(165,239,83, 0.4)',
              'rgba(120, 102, 255, 0.6)',
              'rgba(164,113,111, 0.8)',
              'rgba(178,135,21, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(31,179,124, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(144,14,249, 1 )',
              'rgba(54, 162, 0, 1)',
              'rgba(255, 100, 86, 1)',
              'rgba(165,239,83, 1)',
              'rgba(120, 102, 255, 1)',
              'rgba(164,113,111, 1)',
              'rgba(178,135,21, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      this.setState({ totalProjects: data.totalProjects, projectTypesAndCount: data.projectTypesAndCount, barChartData: chartData });
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
            <div className="my-auto"><hr />
              <Col>
                <Row className="justify-content-md-center">
                  <div>
                    {this.state.projectTypesAndCount.map(function (item, index) {
                      return (
                        <Button size="sm" className="btn-tag2">
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
                <Col lg={7} md={12} sm={12} xs={12} className="mb-3">
                  <Card>
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <h3 className="mb-0">Latest Projects</h3>
                        <div className="col text-right">
                          <Button
                            size="sm"
                          >
                            <Link to={{ pathname: '/allprojects' }}>
                              See all
                            </Link>
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
                              {/* <TableCell><h2>Token Type</h2></TableCell>
                              <TableCell><h2>Ticker</h2></TableCell> */}
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
                                    {/* <TableCell><p>{item.tokenType}</p></TableCell>
                                    <TableCell><p>{item.ticker}</p></TableCell> */}
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
                <Col lg={5} md={12} sm={12} xs={12} className="mb-3">
                  <Card>
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <h3 className="mb-0">Live Sales</h3>
                      </Row>
                    </CardHeader>

                    <Carousel autoPlay interval="7000" showArrows={true} showThumbs={false} infiniteLoop={true} showIndicators={false}>
                      {this.state.salesData.map(function (item, index) {
                        return (
                          <div>
                            <CardBody>
                              <CardTitle><b>{item.projectName}</b></CardTitle>
                              <CardText>
                                <p><b>Sale Type: </b>{item.upcomingSale}</p>
                                <p><b>Start Date: </b>{item.saleStartDate} <b>End Date: </b>{item.saleEndDate}</p>
                              </CardText>
                              <hr />
                              {!isEmpty(item.tokenDistributionDetail) && (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                  <Button
                                    size="sm" variant="outline-light"><a href={item.tokenDistributionDetail} target="_blank" rel="noreferrer">Sale Details</a></Button>
                                </div>
                              )}
                            </CardBody>
                          </div>
                        )
                      })}
                    </Carousel>
                  </Card>


                  <Card>
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <h3 className="mb-0">Project Types</h3>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <div className="chart">
                        <Bar
                          data={this.state.barChartData}
                        // options={this.state.barChartData.options}
                        />
                      </div>
                    </CardBody>
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
