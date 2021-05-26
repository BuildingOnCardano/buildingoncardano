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
import { TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import "../styles/styles.css";
import SearchInput from 'components/SearchInput';

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

      this.setState({ totalProjects: data.totalProjects, projectTypesAndCount: data.projectTypesAndCount });
      this.state.projectTypesAndCount = data.projectTypesAndCount;
      console.log(this.state.projectTypesAndCount);
    } catch (error) {
      console.log(error)
    }
  }


  render() {

    return (
      <Page
        className="DashboardPage"
        title=""
        breadcrumbs={[{ name: '/', active: true }]}
      >
        {/* <Row style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>         {width > 700 && <SearchInput />}</Row> */}

        {this.state.loading ? <div>Loading projects...<BeatLoader loading={this.state.loading} css={override} size={180} /></div>
          :
          <Row>
            <Col lg={3} md={2} sm={2} xs={12} className="mb-3">
              <NumberWidget
                title="Total Projects"
                number={this.state.totalProjects}
                color="secondary"
              />
            </Col>

            {this.state.projectTypesAndCount.map(function (item, index) {
              return (
                <Col lg={3} md={2} sm={2} xs={12} className="mb-3">
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

        <Row style={{
          justifyContent: 'left',
          alignItems: 'center',
        }}>
          <Col lg={9} sm={4} sm={3} xs={12}>
            <Card >
              <CardHeader><h2>Latest Projects</h2></CardHeader>
                {this.state.loading ? <div>Loading projects...<BeatLoader loading={this.state.loading} css={override} size={180} /></div>
                  :
                  <Table  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow:'wrap',
                    whiteSpace: 'unset',
                    minWidth: "10vh", minHeight: "10vh"
                  }}>
                    <TableHead>
                      {this.state.smallScreen ?
                        <TableRow >
                          {/* <th>#</th> */}
                          {/* <TableCell></TableCell> */}
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
                    <TableBody>

                      {this.state.smallScreen ?
                        this.state.projects.map(function (item, index) {
                          return (
                            <TableRow component={Link} to={{ pathname: '/projectdetails', state: { projectDetails: item } }}>

                              {/* <td scope="row">{item.id}</td> */}
                              {/* <TableCell><h6>{item.imageUrl != null && item.imageUrl.includes('http') && (<img
                                src={item.imageUrl}
                                className="rounded"
                                style={{ width: 25, height: 25 }}
                              />)} </h6></TableCell> */}
                              <TableCell ><h3>{item.name}</h3></TableCell>
                              <TableCell ><h3>{item.type}</h3></TableCell>

                            </TableRow >
                          )
                        })

                        :
                        this.state.projects.map(function (item, index) {
                          if(index< 10){
                          return (
                            <TableRow component={Link} to={{ pathname: '/projectdetails', state: { projectDetails: item } }} >
                              {/* <td scope="row">{item.id}</td> */}
                              <TableCell><h4>{item.imageUrl != null && item.imageUrl.includes('http') && (<img
                                src={item.imageUrl}
                                className="rounded"
                                style={{ width: "10vh", height: "10vh" }}
                              />)} </h4></TableCell>
                              <TableCell><h3>{item.name}</h3></TableCell>
                              <TableCell><h3>{item.type}</h3></TableCell>
                              <TableCell><h3>{item.tokenType}</h3></TableCell>
                              <TableCell><h3>{item.ticker}</h3></TableCell>
                              <TableCell><h3>{item.stage}</h3></TableCell>
                            </TableRow >
                          )}
                        })}
                    </TableBody >
                  </Table>
                }
            </Card>
          </Col>
        </Row>


      </Page>
    );
  }
}
export default DashboardPage;
