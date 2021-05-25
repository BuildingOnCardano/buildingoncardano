import Page from 'components/Page';
import { IconWidget, NumberWidget } from 'components/Widget';
import React from 'react';
import {
  Card,
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
import { TableRow, TableCell, TableHead, TableBody   } from '@material-ui/core';
import "../styles/styles.css";

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
    // console.log(this.props.location.state.loggedIn);

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
      console.log(data);
      this.setState({ projects: data, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  async getProjectsStats() {
    try {
      var response = await fetch(baseUrl + getProjectsStats);
      const data = await response.json();
      console.log(data);
      var projectTypesAndCount = data.projectTypesAndCount;
      this.setState({ totalProjects: data.totalProjects, projectTypesAndCount: projectTypesAndCount })
    } catch (error) {
      console.log(error)
    }
  }


  render() {

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: '/', active: true }]}
      >
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Projects"
              number={this.state.totalProjects}
              color="secondary"
            />
          </Col>
        </Row>
        <Row style={{          
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Col lg="9" sm={6} sm={6}>
            <Card >
              {/* <CardHeader>Projects</CardHeader> */}
              <CardBody>
                {this.state.loading ? <div>Loading projects...<BeatLoader loading={this.state.loading} css={override} size={180} /></div>
                  :
                  <Table>
                    <TableHead>
                      {this.state.smallScreen ?
                        <TableRow >
                          {/* <th>#</th> */}
                          <TableCell><h2>Project</h2></TableCell>
                          <TableCell><h2>Type</h2></TableCell>
                        </TableRow >
                        :
                        <TableRow >
                          <TableCell></TableCell>
                          <TableCell padding="none"><h2>Project</h2></TableCell>
                          <TableCell><h2>Type</h2></TableCell>
                          <TableCell><h2>Token Type</h2></TableCell>
                          <TableCell><h2>Ticker</h2></TableCell>
                          <TableCell><h2>Stage</h2></TableCell>
                        </TableRow >}

                    </TableHead>
                    <TableBody >

                      {this.state.smallScreen ?
                        this.state.projects.map(function (item, index) {
                          return (
                            <TableRow component={Link} to={{ pathname: '/projectdetails', state: { projectDetails: item } }}>

                              {/* <td scope="row">{item.id}</td> */}
                              <TableCell ><h3>{item.name}</h3></TableCell>
                              <TableCell ><h3>{item.type}</h3></TableCell>

                            </TableRow >
                          )
                        })

                        :
                        this.state.projects.map(function (item, index) {
                          return (
                            <TableRow component={Link} to={{ pathname: '/projectdetails', state: { projectDetails: item } }} >
                              {/* <td scope="row">{item.id}</td> */}                              
                              <TableCell><h4>{item.imageUrl != null && item.imageUrl.includes('http') && (<img
                                src={item.imageUrl}
                                className="rounded"
                                style={{ width: 100, height: 100 }}
                              />)} </h4></TableCell>
                              <TableCell><h3>{item.name}</h3></TableCell>
                              <TableCell><h3>{item.type}</h3></TableCell>
                              <TableCell><h3>{item.tokenType}</h3></TableCell>
                              <TableCell><h3>{item.ticker}</h3></TableCell>
                              <TableCell><h3>{item.stage}</h3></TableCell>
                            </TableRow >
                          )
                        })}
                    </TableBody >
                  </Table>
                }
              </CardBody>

            </Card>
          </Col>
        </Row>


      </Page>
    );
  }
}
export default DashboardPage;
