import Page from 'components/Page';
import { IconWidget, NumberWidget } from 'components/Widget';
import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Table
} from 'reactstrap';
import BeatLoader
  from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import { baseUrl, getAllProjects, getProjectsStats } from '../assets/services';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, TableHead, TableBody, TableContainer } from '@material-ui/core';
import "../styles/styles.css";
import SearchInput from 'components/SearchInput';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
        title="Welcome to Building On Cardano"
      // breadcrumbs={[{ name: '/', active: true }]}
      >
        {this.state.loading ? <div>Loading projects...<BeatLoader loading={this.state.loading} css={override} size={180} /></div>
          :
          <Col lg={12} sm={12} sm={12} xs={12}>

            <Row style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>

              <Col lg={9} sm={12} sm={12} xs={12}>
                <SearchInput projects={this.state.projects} />

                <Card style={{ margin: '1rem' }}>
                  <CardHeader style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: '1.9em'
                  }}><h2>Latest Projects</h2></CardHeader>
                  <CardBody>
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
                                  <TableCell><h3>{item.imageUrl != null && item.imageUrl.includes('http') && (<img
                                    src={item.imageUrl}
                                    className="rounded"
                                    style={{ width: 30, height: 30 }}
                                  />)}  {item.name}</h3></TableCell>
                                  <TableCell><h3>{item.type}</h3></TableCell>

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
                                    <TableCell><h3>{item.imageUrl != null && item.imageUrl.includes('http') && (<img
                                      src={item.imageUrl}
                                      className="rounded"
                                      style={{ width: "10vh", height: "10vh" }}
                                    />)}{item.name}</h3></TableCell>
                                    <TableCell><h3>{item.type}</h3></TableCell>
                                    <TableCell><h3>{item.tokenType}</h3></TableCell>
                                    <TableCell><h3>{item.ticker}</h3></TableCell>
                                    <TableCell><h3>{item.stage}</h3></TableCell>
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

              <Col lg={3} sm={12} sm={12} xs={12}>
                {this.state.loading ? <div>Loading projects...<BeatLoader loading={this.state.loading} css={override} size={180} /></div>
                  :
                  <Row>
                    <Col lg={6} sm={12} sm={12} xs={12}>
                      <NumberWidget
                        title="Total Projects"
                        number={this.state.totalProjects}
                        color="secondary"
                      />
                    </Col>

                    {this.state.projectTypesAndCount.map(function (item, index) {
                      return (
                        <Col lg={6} sm={12} sm={12} xs={12}>
                          <Link to={{ pathname: '/' + item.projectType }}>
                            <NumberWidget
                              title={item.projectType}
                              number={item.projectCount}
                              color="secondary"
                            />
                          </Link>
                        </Col>
                      )
                    })}
                  </Row>
                }


              </Col>
            </Row>
          </Col>}
      </Page>
    );
  }
}
export default DashboardPage;
