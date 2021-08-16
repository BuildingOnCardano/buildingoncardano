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
import FeaturedProjectCard from 'components/FeaturedProjectCard';//RecentlyAddedProjectCard
import RecentlyAddedProjectCard from 'components/RecentlyAddedProjectCard';//RecentlyAddedProjectCard
import CardanoImage from 'assets/img/cardanoIcon.png';
import ReactImageFallback from "react-image-fallback";

import Particle from "react-particles-js";
import particlesConfig from "../assets/particlesConfig.json";

import shamrock from 'assets/img/paddy.jpg';
import paul from 'assets/img/paul.jpg';
import "../styles/imageoverlay.css";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;

class DashboardPage extends React.Component {
  state = {
    recentlyAddedProjects: null,
    featuredProjects: null,
    mostViewedProjects: null,
    mostViewedPreviousMonthProjects: null,
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
    // this.getProjectsStats();
    this.getLiveSales();

    var dataLoaded = await this.getDashBoardData();
    if (dataLoaded) {
      this.setState({ loading: false });
    }

  }

  async getDashBoardData() {
    await Promise.all([this.getFeaturedProjects(), this.getMostPreviousMonthViewedProjects()], this.getMostViewedProjects(), this.getLatestProjects());
    return true;
  }

  async getLatestProjects() {
    try {
      var response = await fetch(baseUrl + getLatestProjects);
      const data = await response.json();
      this.setState({ recentlyAddedProjects: data });
    } catch (error) {
      console.log(error)
    }
  }

  async getFeaturedProjects() {
    try {
      var response = await fetch(baseUrl + getLatestProjects);
      const data = await response.json();
      this.setState({ featuredProjects: this.shuffle(data) });
    } catch (error) {
      console.log(error)
    }
  }

  async getMostPreviousMonthViewedProjects() {
    try {
      var response = await fetch(baseUrl + getMostViewedProjects + "/" + this.getPreviousMonthName());
      const data = await response.json();
      this.setState({ mostViewedPreviousMonthProjects: data });
    } catch (error) {
      console.log(error)
    }
  }


  async getMostViewedProjects() {
    try {
      var response = await fetch(baseUrl + getMostViewedProjects + "/" + this.getMonthName());
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

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getPreviousMonthName() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const d = new Date();
    var currentMonth = d.getMonth();
    var lastMonth = currentMonth - 1;
    if (lastMonth < 0) lastMonth = 11;

    return monthNames[lastMonth];
  }

  getMonthName() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const d = new Date();
    var currentMonth = d.getMonth();
    return monthNames[currentMonth];
  }

  render() {

    return (
      <Page
        className="DashboardPage"
      // title="Dashboard"
      >

        <Particle params={particlesConfig} className="App-particles__container" />

        {this.state.loading ? <div><CircleLoader loading={this.state.statsloading} css={override} size={80} /></div>
          :
          <div>
            {/* <Particle params={particlesConfig} className="App-particles__container" /> */}



            <div>




              {/* <Row>
                <Col>
                  <h3 className="mb-0">App Types</h3>
                </Col>
              </Row> */}
              <Card>
                <CardBody>



                  <div className="App">
                    <Row>
                      <Col lg={3} md={12} sm={12} xs={12} className="mb-3">
                        <div class="wrapper">
                          <img class="img_0_left" src={this.state.featuredProjects[0].imageUrl} />
                          <img class="img_1_left" src={this.state.featuredProjects[1].imageUrl} />
                          <img class="img_2_left" src={this.state.featuredProjects[2].imageUrl} />
                          <img class="img_3_left" src={this.state.featuredProjects[4].imageUrl} />
                        </div>
                      </Col>
                      <Col lg={6} md={12} sm={12} xs={12} className="mb-3">
                        <div className="App-text">
                          <h1 className="App-text__title">&#123;Building On Cardano&#125;</h1>
                          <h2 className="App-text__body">
                            The Home of All things being built on Cardano
                          </h2>
                        </div>
                      </Col>
                      <Col lg={3} md={12} sm={12} xs={12} className="mb-3">
                        <div class="wrapper">
                          <img class="img_0_right" src={this.state.featuredProjects[0].imageUrl} />
                          <img class="img_1_right" src={this.state.featuredProjects[1].imageUrl} />
                          <img class="img_2_right" src={this.state.featuredProjects[2].imageUrl} />
                          <img class="img_3_right" src={this.state.featuredProjects[4].imageUrl} />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <Row className="justify-content-md-center">
                    {this.state.projectTypesAndCount.map(function (item, index) {
                      return (
                        <Button size="sm" className="btn-tag2">
                          <Link to={{ pathname: '/' + item.projectType }}>
                            {item.projectType} ({item.projectCount})
                          </Link>
                        </Button>
                      )
                    })}
                  </Row>
                </CardBody>
              </Card>

              <Row style={{ padding: 0, marginBottom: 0, }}>
                <Col>
                  <h3 className="mb-0">Featured Apps</h3>
                </Col>
                <Col className="col text-right">
                  <Link to={{ pathname: '/promote' }}>
                    <small>Promote your app here.</small>
                  </Link>
                </Col>
              </Row>
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
                <Col>
                  <h3 className="mb-0">Recently Added</h3>
                </Col>
              </Row>
              <Row>
                {this.state.recentlyAddedProjects.map(function (item, index) {
                  if (index < 6) {
                    return (
                      <Col lg={2} md={10} sm={10} xs={12} className="mb-3">
                        <div className='ProjectCards'>
                          <RecentlyAddedProjectCard
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
                        <h3 className="mb-0">{this.getPreviousMonthName()} Most Popular</h3>
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
                    <CardBody>
                      <TableContainer component={Paper}>
                        <Table >
                          <TableBody>

                            {this.state.smallScreen ?
                              this.state.mostViewedPreviousMonthProjects.map(function (item, index) {
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
                                          width="32"
                                          height="32"
                                          fallbackImage={CardanoImage} />

                                      )}    {item.name}</p></TableCell>
                                      {/* <TableCell><p>{item.type}</p></TableCell> */}

                                    </TableRow >
                                  )
                                }
                              })

                              :
                              this.state.mostViewedPreviousMonthProjects.map(function (item, index) {
                                if (index < 5) {
                                  return (
                                    <TableRow component={Link} to={{ pathname: '/projectdetails/' + item.name, state: { projectDetails: item } }} >
                                      <TableCell><p>{item.imageUrl != null && item.imageUrl.includes('http') && (
                                        <ReactImageFallback
                                          src={item.imageUrl}
                                          width="32"
                                          height="32"
                                          fallbackImage={CardanoImage}
                                          marginRight="10px" />
                                      )}{item.name}</p></TableCell>
                                      {/* <TableCell><p>{item.type}</p></TableCell> */}
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
                    </CardBody>
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
                    <CardBody>
                      <TableContainer component={Paper}>
                        <Table >
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
                                          width="32"
                                          height="32"
                                          fallbackImage={CardanoImage} />

                                      )}    {item.name}</p></TableCell>
                                      {/* <TableCell><p>{item.type}</p></TableCell> */}

                                    </TableRow >
                                  )
                                }
                              })

                              :
                              this.state.mostViewedProjects.map(function (item, index) {
                                if (index < 5) {
                                  return (
                                    <TableRow component={Link} to={{ pathname: '/projectdetails/' + item.name, state: { projectDetails: item } }} >
                                      <TableCell><p>{item.imageUrl != null && item.imageUrl.includes('http') && (
                                        <ReactImageFallback
                                          src={item.imageUrl}
                                          width="32"
                                          height="32"
                                          fallbackImage={CardanoImage}
                                          marginRight="10px" />
                                      )}{item.name}</p></TableCell>
                                      {/* <TableCell><p>{item.type}</p></TableCell> */}
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
                    </CardBody>
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
                    <CardBody>
                      <Carousel autoPlay interval="7000" showArrows={true} showThumbs={false} infiniteLoop={true} showIndicators={false}>
                        {this.state.salesData.map(function (item, index) {
                          return (
                            <div>

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

                            </div>
                          )
                        })}

                      </Carousel>
                    </CardBody>
                  </Card>


                  {/* <Card>
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
                  </Card> */}
                </Col>
              </Row>
            </div>
          </div >}

      </Page>
    );
  }
}
export default DashboardPage;
