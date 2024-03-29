import Page from 'components/Page';
import React from 'react';
import {
  Col,
  Row,
  Table,
  Button,
  Media,
} from 'reactstrap';
import CircleLoader from 'react-spinners/CircleLoader';
import { css } from '@emotion/core';
import {
  baseUrl,
  getLatestProjects,
  getProjectsStatsTypes,
  liveProjectSales,
  getFeaturedProjectsList,
} from '../assets/services';
import { Link } from 'react-router-dom';
import {
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@mui/material';
import '../styles/styles.css';
import Paper from '@mui/material/Paper';
import { removeUserSession } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import FeaturedProjectCard from 'components/FeaturedProjectCard'; //RecentlyAddedProjectCard
import RecentlyAddedProjectCard from 'components/RecentlyAddedProjectCard'; //RecentlyAddedProjectCard
import '../styles/imageoverlay.css';

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
    mostViewedPreviousePreviousMonthProjects: null,
    recentlyUpdateProjects: null,
    salesData: null,
    loading: true,
    totalProjects: '',
    projectTypesAndCount: null,
    barChartData: null,
    smallScreen: false,
    projectTokensWalletRankings: null,
    projectTokensTransactionRankings: null,
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

    var dataLoaded = await this.getDashBoardData();
    if (dataLoaded) {
      this.setState({ loading: false });
    }
  }

  async getDashBoardData() {
    // //TOKENS TOTAL WALLETS
    // var response = await fetch(baseUrl + getProjectTokensWalletRankings);
    // const projectTokensWalletRankings = await response.json();

    // if (projectTokensWalletRankings.status == 200) {
    //   this.setState({ projectTokensWalletRankings: projectTokensWalletRankings });
    // }

    // //TOKENS TOTAL TRX
    // var response = await fetch(baseUrl + getProjectTokensTransactionRankings);
    // const projectTokensTransactionRankings = await response.json();
    // this.setState({ projectTokensTransactionRankings: projectTokensTransactionRankings });

    //LATEST PROJECTS
    if (this.state.recentlyAddedProjects === null) {
      var response = await fetch(baseUrl + getLatestProjects);
      const getLatestProjectsVar = await response.json();
      this.setState({ recentlyAddedProjects: getLatestProjectsVar });
    }

    //FEATURED PROJECTS
    if (this.state.featuredProjects === null) {
      var response = await fetch(baseUrl + getFeaturedProjectsList);
      const getFeaturedProjects = await response.json();
      this.setState({ featuredProjects: this.shuffle(getFeaturedProjects) });
    }


    // //TWO MONTHS AGO VIEWS RANKING
    // var response = await fetch(baseUrl + getMostViewedProjects + "/" + this.getPreviousPreviousMonthName());
    // const getMostPreviousPreviousMonthViewedProjects = await response.json();
    // this.setState({ mostViewedPreviousePreviousMonthProjects: getMostPreviousPreviousMonthViewedProjects });

    // //ONE MONTH AGO VIEWS RANKING
    // var response = await fetch(baseUrl + getMostViewedProjects + "/" + this.getPreviousMonthName());
    // const getMostPreviousMonthViewedProjects = await response.json();
    // this.setState({ mostViewedPreviousMonthProjects: getMostPreviousMonthViewedProjects });

    // //CURRENT MONTH VIEWS RANKING
    // var response = await fetch(baseUrl + getMostViewedProjects + "/" + this.getMonthName());
    // const getMostViewedProjectsVar = await response.json();
    // this.setState({ mostViewedProjects: getMostViewedProjectsVar });

    // //UPDATED PROJECTS
    // var response = await fetch(baseUrl + getRecentlyUpdatedProjects);
    // const getRecentlyUpdatedProjectsVar = await response.json();
    // this.setState({ recentlyUpdateProjects: getRecentlyUpdatedProjectsVar });

    if (this.state.projectTypesAndCount === null) {
      await this.getProjectsStats();
    }
    //await Promise.all([this.getFeaturedProjects(), this.getMostPreviousMonthViewedProjects()], this.getMostViewedProjects(), this.getLatestProjects());
    return true;
  }

  async getProjectsStats() {
    try {
      var response = await fetch(baseUrl + getProjectsStatsTypes);
      const data = await response.json();

      var labels = [];
      var counts = [];
      data.projectTypesAndCount.forEach(element => {
        labels.push(element.projectType);
        counts.push(element.projectCount);
      });

      this.setState({ projectTypesAndCount: data.projectTypesAndCount });
      this.state.projectTypesAndCount = data.projectTypesAndCount;
    } catch (error) {
      console.log(error);
    }
  }

  async getLiveSales() {
    try {
      var response = await fetch(baseUrl + liveProjectSales);
      const data = await response.json();
      this.setState({ salesData: data });
    } catch (error) {
      console.log(error);
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
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const d = new Date();
    var currentMonth = d.getMonth();
    var lastMonth = currentMonth - 1;
    if (lastMonth < 0) lastMonth = 11;

    return monthNames[lastMonth];
  }

  getPreviousPreviousMonthName() {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const d = new Date();
    var currentMonth = d.getMonth();
    var lastMonth = currentMonth - 2;
    if (currentMonth == 0) {
      lastMonth = 10;
    } else if (currentMonth == 1) {
      lastMonth = 11;
    } else {
      lastMonth = currentMonth - 2;
    }
    return monthNames[lastMonth];
  }

  getMonthName() {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
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
        {this.state.loading ? (
          <div>
            <CircleLoader
              loading={this.state.statsloading}
              css={override}
              size={80}
            />
          </div>
        ) : (
          <div>
            {this.state.featuredProjects != null &&
              this.state.featuredProjects.length != 0 && (
                <Row>
                  <Col>
                    <h4
                      className="mb-0"
                      style={{
                        color: '#225cb6',
                        justifyContent: 'left',
                        alignItems: 'left',
                        textAlign: 'left',
                        marginTop: '20px'
                      }}
                    >
                      Featured
                    </h4>
                  </Col>
                </Row>
              )}
            <Row>
              {this.state.featuredProjects.map(function (item, index) {
                if (index < 4) {
                  return (
                    <Col lg={3} md={10} sm={10} xs={12} className="mb-3">
                      <div className="ProjectCards">
                        <FeaturedProjectCard
                          img={item.imageUrl}
                          projectDetails={item}
                        />
                      </div>
                    </Col>
                  );
                }
              })}
            </Row>
            <Col className="col text-right">
              <Link to="/promote">
                <small>Promote your app here.</small>
              </Link>
            </Col>

            <Row>
              <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
                <h4
                  className="mb-0"
                  style={{
                    color: '#225cb6',
                    justifyContent: 'left',
                    alignItems: 'left',
                    textAlign: 'left',
                  }}
                >
                  Recently added
                </h4>

                <Row>
                  {this.state.smallScreen
                    ? this.state.recentlyAddedProjects.map(function (
                      item,
                      index,
                    ) {
                      if (index < 2) {
                        return (
                          <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
                            <div className="ProjectCards">
                              <RecentlyAddedProjectCard
                                img={item.imageUrl}
                                projectDetails={item}
                              />
                            </div>
                          </Col>
                        );
                      }
                    })
                    : this.state.recentlyAddedProjects.map(function (
                      item,
                      index,
                    ) {
                      if (index < 4) {
                        return (
                          <Col lg={3} md={4} sm={6} xs={6} className="mb-3">
                            <div className="ProjectCards">
                              <RecentlyAddedProjectCard
                                img={item.imageUrl}
                                projectDetails={item}
                              />
                            </div>
                          </Col>
                        );
                      }
                    })}
                </Row>
              </Col>
              {/* <Col lg={6} md={12} sm={12} xs={12} className="mb-3">
                <Row>
                  <Col>
                    <h4 className="mb-0" style={{ color: "#225cb6" }}>Recently updated</h4>
                  </Col>
                </Row>
                <Row>

                  {this.state.smallScreen ?

                    this.state.recentlyUpdateProjects.map(function (item, index) {
                      if (index < 2) {
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
                    })

                    :

                    this.state.recentlyUpdateProjects.map(function (item, index) {
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
                    })

                  }
                </Row>

              </Col> */}
            </Row>

            {/* <h4 className="mb-0" style={{ color: "#225cb6" }}>Project Views Rankings</h4>
            <br></br> */}
            <Row>
              {/* <Col lg={3} md={6} sm={12} xs={12} className="mb-3">
                <Row>
                  <Row>
                    <Col>
                      <h4 className="mb-0" style={{ color: "#225cb6" }}>{this.getPreviousMonthName()}</h4>
                    </Col>
                    <Col className="col text-right">
                      <Link to='/promote'>
                        <small>See All</small>
                      </Link>
                    </Col>
                  </Row>
                  <TableContainer component={Paper}>
                    <Table >
                      <TableBody>

                        {this.state.smallScreen ?
                          this.state.mostViewedPreviousMonthProjects.map(function (item, index) {
                            if (index < 4) {
                              return (
                                <TableRow component={Link} to={`/projectdetails/${item.name}`} state={{ projectDetails: item }}>

                                  <TableCell>
                                    <Media className="align-items-center">
                                      <a className="avatar rounded-circle mr-3">
                                        <CircularImage imageUrl={item.imageUrl} height={40} width={40} />
                                      </a>
                                      <Media>
                                        <span className="mb-0 text-sm" style={{ color: "#225cb6" }}>
                                          {item.name}
                                        </span>
                                      </Media>
                                    </Media>
                                  </TableCell>
                                </TableRow >
                              )
                            }
                          })

                          :
                          this.state.mostViewedPreviousMonthProjects.map(function (item, index) {
                            if (index < 4) {
                              return (
                                <TableRow component={Link} to={`/projectdetails/${item.name}`} state={{ projectDetails: item }}>
                                  <TableCell>
                                    <Media className="align-items-center">
                                      <a className="avatar rounded-circle mr-3">
                                        <CircularImage imageUrl={item.imageUrl} height={40} width={40} />
                                      </a>
                                      <Media>
                                        <span className="mb-0 text-sm" style={{ color: "#225cb6" }}>
                                          <b>{item.name}</b>
                                        </span>
                                      </Media>
                                    </Media>
                                  </TableCell>
                                  <TableCell><p style={{ color: "#225cb6" }}><b>{item.type}</b></p></TableCell>
                                </TableRow >
                              )
                            }
                          })}
                      </TableBody >
                    </Table>
                    <Col className="col text-right">
                      <Link to={'/promote'}>
                        <small>See All</small>
                      </Link>
                    </Col>
                  </TableContainer>
                </Row>

                <Row>
                  <Row>
                    <Col>
                      <h4 className="mb-0" style={{ color: "#225cb6" }}>{this.getPreviousPreviousMonthName()}</h4>
                    </Col>
                  </Row>
                  <TableContainer component={Paper}>
                    <Table >
                      <TableBody>
                        {this.state.smallScreen ?
                          this.state.mostViewedPreviousePreviousMonthProjects.map(function (item, index) {
                            if (index < 4) {
                              return (
                                <TableRow component={Link} to={`/projectdetails/${item.name}`} state={{ projectDetails: item }}>
                                  <TableCell>
                                    <Media className="align-items-center">
                                      <a className="avatar rounded-circle mr-3">
                                        <CircularImage imageUrl={item.imageUrl} height={40} width={40} />
                                      </a>
                                      <Media>
                                        <span className="mb-0 text-sm" style={{ color: "#225cb6" }}>
                                          <b>{item.name}</b>
                                        </span>
                                      </Media>
                                    </Media>
                                  </TableCell>
                                </TableRow >
                              )
                            }
                          })

                          :
                          this.state.mostViewedPreviousePreviousMonthProjects.map(function (item, index) {
                            if (index < 4) {
                              return (
                                <TableRow component={Link} to={`/projectdetails/${item.name}`} state={{ projectDetails: item }}>

                                  <TableCell>
                                    <Media className="align-items-center">
                                      <a className="avatar rounded-circle mr-3">
                                        <CircularImage imageUrl={item.imageUrl} height={40} width={40} />
                                      </a>
                                      <Media>
                                        <span className="mb-0 text-sm" style={{ color: "#225cb6" }}>
                                          <b>{item.name}</b>
                                        </span>
                                      </Media>
                                    </Media>
                                  </TableCell>
                                  <TableCell><p style={{ color: "#225cb6" }}><b>{item.type}</b></p></TableCell>
                                </TableRow >
                              )
                            }
                          })}
                      </TableBody >
                    </Table>
                    <Col className="col text-right">
                      <Link to={'/promote'}>
                        <small>See All</small>
                      </Link>
                    </Col>
                  </TableContainer>
                </Row>
              </Col> */}

              <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
                <Row>
                  <Col>
                    <h4
                      className="mb-0"
                      style={{
                        color: '#225cb6',
                        justifyContent: 'left',
                        alignItems: 'left',
                        textAlign: 'left',
                      }}
                    >
                      Project Types
                    </h4>
                  </Col>
                  <Row
                    className="justify-content-md-center"
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    {this.state.projectTypesAndCount.map(function (
                      item,
                      index,
                    ) {
                      return (
                        <Link to={`/projects/${item.projectType}`}>
                          <Button
                            size="m"
                            className="btn-tag2"
                            style={{ minHeight: '10vh', minWidth: '10vw' }}
                          >
                            <h4>
                              {item.projectType} <br></br>({item.projectCount})
                            </h4>
                          </Button>
                        </Link>
                      );
                    })}
                  </Row>
                </Row>
                <Col className="col text-right">
                  <Link to="/recentlyadded">
                    <small>View All</small>
                  </Link>
                </Col>
              </Col>

              {/* <Col lg={4} md={12} sm={12} xs={12} className="mb-3">
                <Row>
                  <Col>
                    <h4 className="mb-0">{this.getMonthName()}</h4>
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
                              </TableRow >
                            )
                          }
                        })

                        :
                        this.state.mostViewedProjects.map(function (item, index) {
                          if (index < 4 && item != null) {
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
                              </TableRow >
                            )
                          }
                        })}
                    </TableBody >
                  </Table>
                </TableContainer>

              </Col> */}
            </Row>

            {this.state.projectTokensWalletRankings != null && (
              <div>
                {/* TOKEN RANKINGS */}
                <h4 className="mb-0" style={{ color: '#225cb6' }}>
                  PROJECT TOKEN RANKINGS
                </h4>
                <br></br>
                <Row>
                  <Col lg={6} md={12} sm={12} xs={12} className="mb-3">
                    <Row>
                      <Col>
                        <h4 className="mb-0" style={{ color: '#225cb6' }}>
                          Total Wallets
                        </h4>
                      </Col>
                    </Row>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableBody>
                          {this.state.smallScreen
                            ? this.state.projectTokensWalletRankings.map(
                              function (item, index) {
                                if (index < 4) {
                                  return (
                                    <TableRow
                                      component={Link}
                                      to={`/projectdetails/${item.project_name}`}
                                    >
                                      <TableCell>
                                        <Media className="align-items-center">
                                          {/* <a className="avatar rounded-circle mr-3">
                                      <CircularImage imageUrl={item.imageUrl} height={40} width={40} />
                                    </a> */}
                                          <Media>
                                            <span className="mb-0 text-sm">
                                              {item.project_name}
                                            </span>
                                          </Media>
                                        </Media>
                                      </TableCell>
                                    </TableRow>
                                  );
                                }
                              },
                            )
                            : this.state.projectTokensWalletRankings.map(
                              function (item, index) {
                                if (index < 4) {
                                  return (
                                    <TableRow
                                      component={Link}
                                      to={`/projectdetails/${item.project_name}`}
                                    >
                                      <TableCell>
                                        <Media className="align-items-center">
                                          {/* <a className="avatar rounded-circle mr-3">
                                      <CircularImage imageUrl={item.imageUrl} height={40} width={40} />
                                    </a> */}
                                          <Media>
                                            <span className="mb-0 text-sm">
                                              {item.project_name}
                                            </span>
                                          </Media>
                                        </Media>
                                      </TableCell>
                                      <TableCell>
                                        <p>{item.asset_name}</p>
                                      </TableCell>
                                      <TableCell>
                                        <p>{item.total_wallets}</p>
                                      </TableCell>
                                    </TableRow>
                                  );
                                }
                              },
                            )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Col>

                  <Col lg={6} md={12} sm={12} xs={12} className="mb-3">
                    <Row>
                      <Col>
                        <h4 className="mb-0" style={{ color: '#225cb6' }}>
                          Total Transactions
                        </h4>
                      </Col>
                    </Row>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableBody>
                          {this.state.smallScreen
                            ? this.state.projectTokensTransactionRankings.map(
                              function (item, index) {
                                if (index < 4) {
                                  return (
                                    <TableRow
                                      component={Link}
                                      to={`/projectdetails/${item.project_name}`}
                                    >
                                      <TableCell>
                                        <Media className="align-items-center">
                                          {/* <a className="avatar rounded-circle mr-3">
                                      <CircularImage imageUrl={item.imageUrl} height={40} width={40} />
                                    </a> */}
                                          <Media>
                                            <span className="mb-0 text-sm">
                                              {item.project_name}
                                            </span>
                                          </Media>
                                        </Media>
                                      </TableCell>
                                    </TableRow>
                                  );
                                }
                              },
                            )
                            : this.state.projectTokensTransactionRankings.map(
                              function (item, index) {
                                if (index < 4) {
                                  return (
                                    <TableRow
                                      component={Link}
                                      to={`/projectdetails/${item.project_name}`}
                                    >
                                      <TableCell>
                                        <Media className="align-items-center">
                                          {/* <a className="avatar rounded-circle mr-3">
                                      <CircularImage imageUrl={item.imageUrl} height={40} width={40} />
                                    </a> */}
                                          <Media>
                                            <span className="mb-0 text-sm">
                                              {item.project_name}
                                            </span>
                                          </Media>
                                        </Media>
                                      </TableCell>
                                      <TableCell>
                                        <p>{item.asset_name}</p>
                                      </TableCell>
                                      <TableCell>
                                        <p>{item.total_transactions}</p>
                                      </TableCell>
                                    </TableRow>
                                  );
                                }
                              },
                            )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Col>
                </Row>
              </div>
            )}

            {/* <Row>
              <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
                <Row>
                  <Col>
                    <h4 className="mb-0" style={{ color: "#225cb6" }}>Project Types</h4>
                  </Col>
                </Row>
                <Row className="justify-content-md-center" style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  {this.state.projectTypesAndCount.map(function (item, index) {
                    return (
                      <Col lg={2} md={6} sm={6} xs={6} className="mb-3">
                        <Link to={{ pathname: '/' + item.projectType }}>
                          <Button size="m" className="btn-tag2" style={{ minHeight: '10vh', minWidth: '10vw' }}>
                            <h4 style={{ color: "#225cb6" }}>{item.projectType} <br></br>({item.projectCount})</h4>
                          </Button>
                        </Link>
                      </Col>
                    )
                  })}
                </Row>

              </Col>

            </Row> */}
          </div>
        )}
      </Page>
    );
  }
}
export default DashboardPage;
