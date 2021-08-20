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
  Media,
  CardText,
  CardTitle
} from 'reactstrap';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrl, getLatestProjects, getProjectsStats, getRecentlyUpdatedProjects, liveProjectSales, getMostViewedProjects, getFeaturedProjectsList } from '../assets/services';
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
import CircularImage from 'utils/CircularImage';


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
    recentlyUpdateProjects: null,
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
    //this.getLiveSales();

    var dataLoaded = await this.getDashBoardData();
    if (dataLoaded) {
      this.setState({ loading: false });
    }

  }

  async getDashBoardData() {

    var response = await fetch(baseUrl + getLatestProjects);
    const getLatestProjectsVar = await response.json();
    this.setState({ recentlyAddedProjects: getLatestProjectsVar });

    var response = await fetch(baseUrl + getFeaturedProjectsList);
    const getFeaturedProjects = await response.json();
    this.setState({ featuredProjects: this.shuffle(getFeaturedProjects) });


    var response = await fetch(baseUrl + getMostViewedProjects + "/" + this.getPreviousMonthName());
    const getMostPreviousMonthViewedProjects = await response.json();
    this.setState({ mostViewedPreviousMonthProjects: getMostPreviousMonthViewedProjects });

    var response = await fetch(baseUrl + getMostViewedProjects + "/" + this.getMonthName());
    const getMostViewedProjectsVar = await response.json();
    this.setState({ mostViewedProjects: getMostViewedProjectsVar });

    var response = await fetch(baseUrl + getRecentlyUpdatedProjects);
    const getRecentlyUpdatedProjectsVar = await response.json();
    this.setState({ recentlyUpdateProjects: getRecentlyUpdatedProjectsVar });

    await this.getProjectsStats();
    //await Promise.all([this.getFeaturedProjects(), this.getMostPreviousMonthViewedProjects()], this.getMostViewedProjects(), this.getLatestProjects());
    return true;
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

      this.setState({ projectTypesAndCount: data.projectTypesAndCount });
      this.state.projectTypesAndCount = data.projectTypesAndCount;

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
    return true;
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



        {this.state.loading ? <div><CircleLoader loading={this.state.statsloading} css={override} size={80} /></div>
          :
          <div>
              <br></br>
              <Card style={{ backgroundColor: "#225cb6", opacity: 0.80, zIndex: 1 }}>
                <CardBody>
                  <div className="App">
                    <Row>
                      {/* <Col lg={3} md={12} sm={12} xs={12} className="mb-3">
                        <div class="wrapper">
                          <img class="img_0_left" src={this.state.featuredProjects[0].imageUrl} />
                          <img class="img_1_left" src={this.state.featuredProjects[1].imageUrl} />
                          <img class="img_2_left" src={this.state.featuredProjects[2].imageUrl} />
                          <img class="img_3_left" src={this.state.featuredProjects[3].imageUrl} />
                        </div>
                      </Col> */}
                      <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
                        <div className="App-text">
                          <h1 className="App-text__title text-white">&#123;Building On Cardano&#125;</h1>
                          <h2 className="text-white">
                            The Home of All things being building on Cardano
                          </h2>
                        </div>
                      </Col>
                      {/* <Col lg={3} md={12} sm={12} xs={12} className="mb-3">
                        <div class="wrapper">
                          <img class="img_0_right" src={this.state.featuredProjects[4].imageUrl} />
                          <img class="img_1_right" src={this.state.featuredProjects[5].imageUrl} />
                          <img class="img_2_right" src={this.state.featuredProjects[6].imageUrl} />
                          <img class="img_3_right" src={this.state.featuredProjects[8].imageUrl} />                      
                        </div>
                      </Col> */}
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

              {this.state.featuredProjects != null && this.state.featuredProjects.length != 0 &&
                <Row style={{ padding: 0, marginBottom: 0, }}>
                  <Col>
                    <h4 className="mb-0">Featured</h4>
                  </Col>
                  <Col className="col text-right">
                    <Link to={{ pathname: '/promote' }}>
                      <small>Promote your app here.</small>
                    </Link>
                  </Col>
                </Row>}
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
                <Col lg={6} md={12} sm={12} xs={12} className="mb-3">
                  <Row>
                    <Col>
                      <h4 className="mb-0">new</h4>
                    </Col>
                  </Row>
                  <Row>
                    {this.state.recentlyAddedProjects.map(function (item, index) {
                      if (index < 3) {
                        return (
                          <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
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
                </Col>
                <Col lg={6} md={12} sm={12} xs={12} className="mb-3">
                  <Row>
                    <Col>
                      <h4 className="mb-0">Updated</h4>
                    </Col>
                  </Row>
                  <Row>
                    {this.state.recentlyUpdateProjects.map(function (item, index) {
                      if (index < 3) {
                        return (
                          <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
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
                </Col>
              </Row>



              <Row>



                <Col lg={6} md={12} sm={12} xs={12} className="mb-3">
                  <Row>
                    <Col>
                      <h4 className="mb-0">{this.getPreviousMonthName()} Most Popular</h4>
                    </Col>
                    <Col className="col text-right">
                      <Link to={{ pathname: '/promote' }}>
                        <small>See All</small>
                      </Link>
                    </Col>
                  </Row>

                  {/* <CardHeader className="border-0">
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
                    </CardHeader> */}
                  {/* <Card>
                    <CardBody> */}

                  <TableContainer component={Paper}>
                    <Table >
                      <TableBody>

                        {this.state.smallScreen ?
                          this.state.mostViewedPreviousMonthProjects.map(function (item, index) {
                            if (index < 4) {
                              return (
                                <TableRow component={Link} to={{ pathname: '/projectdetails/' + item.name, state: { projectDetails: item } }}>
                                  <TableCell>
                                    <Media className="align-items-center">
                                      <a className="avatar rounded-circle mr-3">
                                        <CircularImage imageUrl={item.imageUrl} height={40} width={40} />
                                      </a>
                                      <Media>
                                        <span className="mb-0 text-sm">
                                          {item.name}
                                        </span>
                                      </Media>
                                    </Media>
                                  </TableCell>
                                  {/* <TableCell><p>{item.type}</p></TableCell> */}

                                </TableRow >
                              )
                            }
                          })

                          :
                          this.state.mostViewedPreviousMonthProjects.map(function (item, index) {
                            if (index < 4) {
                              return (
                                <TableRow component={Link} to={{ pathname: '/projectdetails/' + item.name, state: { projectDetails: item } }} >
                                  <TableCell>
                                    <Media className="align-items-center">
                                      <a className="avatar rounded-circle mr-3">
                                        <CircularImage imageUrl={item.imageUrl} height={40} width={40} />
                                      </a>
                                      <Media>
                                        <span className="mb-0 text-sm">
                                          {item.name}
                                        </span>
                                      </Media>
                                    </Media>
                                  </TableCell>
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
                  {/* </CardBody>
                  </Card> */}
                </Col>

                <Col lg={6} md={12} sm={12} xs={12} className="mb-3">
                  {/* <Card>
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
                    <CardBody> */}
                  <Row>
                    <Col>
                      <h4 className="mb-0">{this.getMonthName()} Most Popular</h4>
                    </Col>
                    <Col className="col text-right">
                      <Link to={{ pathname: '/allprojects' }}>
                        <small>See All</small>
                      </Link>
                    </Col>
                  </Row>
                  <TableContainer component={Paper}>
                    <Table >
                      <TableBody>
                        {this.state.smallScreen ?
                          this.state.mostViewedProjects.map(function (item, index) {
                            if (index < 4) {
                              return (
                                <TableRow component={Link} to={{ pathname: '/projectdetails/' + item.name, state: { projectDetails: item } }}>
                                  <TableCell>
                                    <Media className="align-items-center">
                                      <a className="avatar rounded-circle mr-3">
                                        <CircularImage imageUrl={item.imageUrl} height={40} width={40} />
                                      </a>
                                      <Media>
                                        <span className="mb-0 text-sm">
                                          {item.name}
                                        </span>
                                      </Media>
                                    </Media>
                                  </TableCell>

                                  {/* <TableCell><p>{item.type}</p></TableCell> */}

                                </TableRow >
                              )
                            }
                          })

                          :
                          this.state.mostViewedProjects.map(function (item, index) {
                            if (index < 4) {
                              return (
                                <TableRow component={Link} to={{ pathname: '/projectdetails/' + item.name, state: { projectDetails: item } }} >
                                  <TableCell>
                                    <Media className="align-items-center">
                                      <a className="avatar rounded-circle mr-3">
                                        <CircularImage imageUrl={item.imageUrl} height={40} width={40} />
                                      </a>
                                      <Media>
                                        <span className="mb-0 text-sm">
                                          {item.name}
                                        </span>
                                      </Media>
                                    </Media>

                                  </TableCell>
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
                  {/* </CardBody>
                  </Card> */}
                </Col>

                {/* <Col lg={4} md={12} sm={12} xs={12} className="mb-3">
                <Row>
                    <Col>
                      <h4 className="mb-0">Live Sales</h4>
                    </Col>
                    <Col className="col text-right">
                      <Link to={{ pathname: '/allsales' }}>
                        <small>See All</small>
                      </Link>
                    </Col>
                  </Row> */}
                {/* <Card>
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
                    <CardBody> */}
                {/* <Carousel autoPlay interval="7000" showArrows={true} showThumbs={false} infiniteLoop={true} showIndicators={false}>
                        {this.state.salesData.map(function (item, index) {
                          return (
                            <div>
                              <br></br>
                              <CardTitle><h2 className="text-white"><b>{item.projectName}</b></h2></CardTitle>
                              <CardText>
                                <br></br>
                                <p><b>Sale Type: </b>{item.upcomingSale}</p>
                                <br></br>
                                <p><b>Start Date: </b>{item.saleStartDate}</p>
                                <br></br>
                                <p><b>End Date: </b>{item.saleEndDate}</p>
                                <br></br>
                              </CardText>
                              <hr />
                              {!isEmpty(item.tokenDistributionDetail) && (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                  <Button
                                    size="sm" variant="outline-light"><a href={item.tokenDistributionDetail} target="_blank" rel="noreferrer">Sale Details</a></Button>
                                  <br></br>
                                </div>
                              )}

                            </div>
                          )
                        })}

                      </Carousel> */}
                {/* </CardBody>
                  </Card> */}


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
                {/* </Col> */}
              </Row>
          </div >}

      </Page>
    );
  }
}
export default DashboardPage;
