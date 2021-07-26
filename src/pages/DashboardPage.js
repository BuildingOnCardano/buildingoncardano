import Page from 'components/Page';
import React from 'react';
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
import { baseUrl, getLatestProjects, getProjectsStats, liveProjectSales, getMostViewedProjects, getAllProjects } from '../assets/services';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, TableHead, TableBody, TableContainer } from '@material-ui/core';
import "../styles/styles.css";
import Paper from '@material-ui/core/Paper';
import { removeUserSession } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';
import { Line, Bar, Pie } from "react-chartjs-2";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import FeaturedProjectCard from 'components/FeaturedProjectCard';
import CardanoImage from 'assets/img/cardanoIcon.png';
import ReactImageFallback from "react-image-fallback";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;

class DashboardPage extends React.Component {
  state = {
    projects: null,
    featuredProjects: null,
    mostViewedProjects: null,
    salesData: null,
    loading: true,
    totalProjects: '',
    projectTypesAndCount: [],
    barChartData: null,
    smallScreen: false
  };

  async componentDidMount() {

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
    await this.getMostViewedProjects();
    await this.getFeaturedProjects();
    await this.getAllProjects();
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

  async getFeaturedProjects() {
    try {
      var response = await fetch(baseUrl + getAllProjects);
      const data = await response.json();
      this.setState({ featuredProjects: this.shuffle(data) });
    } catch (error) {
      console.log(error)
    }
  }

  async getMostViewedProjects() {
    try {
      var response = await fetch(baseUrl + getMostViewedProjects);
      const data = await response.json();
      this.setState({ mostViewedProjects: data });
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

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getMonthName() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const d = new Date();
    return monthNames[d.getMonth()];
  }

  render() {

    return (
      <Page
        className="DashboardPage"
      // title="Dashboard"
      >
        {this.state.loading ? <div><CircleLoader loading={this.state.statsloading} css={override} size={80} /></div>
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
              <div>
                <h3 className="mb-0">Featured Apps</h3>
                <div className="col text-right">
                  <Link to={{ pathname: '/promote' }}>
                    <small>Promote your app here.</small>
                  </Link>
                </div>
              </div>
              <Row>
                {this.state.featuredProjects.map(function (item, index) {
                  if (index < 4) {
                    return (
                      <Col lg={3} md={10} sm={10} xs={12} className="mb-3">
                        <div className='ProjectCards'>
                          <FeaturedProjectCard
                            img={item.imageUrl}
                            projectDetails={item} />
                        </div>
                      </Col>
                    )
                  }
                })}
              </Row>


              <Row>
                <Col lg={4} md={12} sm={12} xs={12} className="mb-3">

                  <Card>
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <h3 className="mb-0">Recently Updated</h3>
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
                              {/* <TableCell><h2>Stage</h2></TableCell> */}
                            </TableRow >}

                        </TableHead>
                        <TableBody>

                          {this.state.smallScreen ?
                            this.state.projects.map(function (item, index) {
                              if (index < 5) {
                                return (
                                  <TableRow component={Link} to={{ pathname: '/projectdetails/' + item.name, state: { projectDetails: item } }}>
                                    <TableCell><p>{item.imageUrl != null && item.imageUrl.includes('http') && (
                                      <ReactImageFallback
                                        src={item.imageUrl}
                                        width="50"
                                        height="50"
                                        fallbackImage={CardanoImage} />
                                    )}    {item.name}</p></TableCell>
                                    <TableCell><p>{item.type}</p></TableCell>

                                  </TableRow >
                                )
                              }
                            })

                            :
                            this.state.projects.map(function (item, index) {
                              if (index < 7) {
                                return (
                                  <TableRow component={Link} to={{ pathname: '/projectdetails/' + item.name, state: { projectDetails: item } }} >
                                    <TableCell><p>{item.imageUrl != null && item.imageUrl.includes('http') && (
                                      // <img
                                      //   src={item.imageUrl}
                                      //   className="rounded"
                                      //   style={{ width: "5vh", height: "5vh", marginRight: "10px" }}
                                      // />
                                      <ReactImageFallback
                                        src={item.imageUrl}
                                        width="50vh"
                                        height="50vh"
                                        fallbackImage={CardanoImage}
                                        />

                                    )}{item.name}</p></TableCell>
                                    <TableCell><p>{item.type}</p></TableCell>
                                    {/* <TableCell><p>{item.tokenType}</p></TableCell>
                                    <TableCell><p>{item.ticker}</p></TableCell> */}
                                    {/* <TableCell><p>{item.stage}</p></TableCell> */}
                                  </TableRow >
                                )
                              }
                            })}
                        </TableBody >
                      </Table>
                    </TableContainer>

                  </Card>
                </Col>

                <Col lg={4} md={12} sm={12} xs={12} className="mb-3">
                  <Card>
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <h3 className="mb-0">{this.getMonthName()} Most Popular</h3>
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
                              {/* <TableCell><h2>Stage</h2></TableCell> */}
                            </TableRow >}

                        </TableHead>
                        <TableBody>

                          {this.state.smallScreen ?
                            this.state.mostViewedProjects.map(function (item, index) {
                              if (index < 5) {
                                return (
                                  <TableRow component={Link} to={{ pathname: '/projectdetails/' + item.name, state: { projectDetails: item } }}>
                                    <TableCell><p>{item.imageUrl != null && item.imageUrl.includes('http') && (
                                    // <img
                                    //   src={item.imageUrl}
                                    //   className="rounded"
                                    //   style={{ width: 100, height: 80 }}
                                    // />

                                    <ReactImageFallback
                                    src={item.imageUrl}
                                    width="50"
                                    height="50"
                                    fallbackImage={CardanoImage} />

                                    )}    {item.name}</p></TableCell>
                                    <TableCell><p>{item.type}</p></TableCell>

                                  </TableRow >
                                )
                              }
                            })

                            :
                            this.state.mostViewedProjects.map(function (item, index) {
                              if (index < 7) {
                                return (
                                  <TableRow component={Link} to={{ pathname: '/projectdetails/' + item.name, state: { projectDetails: item } }} >
                                    <TableCell><p>{item.imageUrl != null && item.imageUrl.includes('http') && (
                                      <ReactImageFallback
                                        src={item.imageUrl}
                                        width="50vh"
                                        height="50vh"
                                        fallbackImage={CardanoImage}
                                        marginRight="10px" />
                                    )}{item.name}</p></TableCell>
                                    <TableCell><p>{item.type}</p></TableCell>
                                    {/* <TableCell><p>{item.tokenType}</p></TableCell>
                  <TableCell><p>{item.ticker}</p></TableCell> */}
                                    {/* <TableCell><p>{item.stage}</p></TableCell> */}
                                  </TableRow >
                                )
                              }
                            })}
                        </TableBody >
                      </Table>
                    </TableContainer>
                  </Card>
                </Col>

                <Col lg={4} md={12} sm={12} xs={12} className="mb-3">
                  <Card>
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <h3 className="mb-0">Live Sales</h3>
                        <div className="col text-right">
                          <Button
                            size="sm"
                          >
                            <Link to={{ pathname: '/allsales' }}>
                              See all
                            </Link>
                          </Button>
                        </div>
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
                                <p><b>Start Date: </b>{item.saleStartDate}</p>
                                <p><b>End Date: </b>{item.saleEndDate}</p>
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
