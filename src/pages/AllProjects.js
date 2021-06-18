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
import Paper from '@material-ui/core/Paper';
import { removeUserSession } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';
import SearchBar from "material-ui-search-bar";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;


class AllProjects extends React.Component {
  state = {
    projects: null,
    loading: true,
    totalProjects: '',
    projectTypesAndCount: [],
    smallScreen: false,
    searched:  "",
    filterAbleProjects: null
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

    this.getAllProjects();
  }

  async getAllProjects() {
    try {
      var response = await fetch(baseUrl + getAllProjects);
      const data = await response.json();
      this.setState({ projects: data, loading: false, filterAbleProjects: data })
    } catch (error) {
      console.log(error)
    }
  }

  requestSearch(searchedVal) {
    this.setState({ searched: searchedVal });

    if(isEmpty(searchedVal)){
      this.cancelSearch();
    }else{
      const filteredRows = this.state.filterAbleProjects.filter((row) => {
        return row.name.toLowerCase().includes(searchedVal.toLowerCase());
      });
      this.setState({ filterAbleProjects: filteredRows });
    }
  };
  
  cancelSearch = () => {
    this.setState({ searched: null,  filterAbleProjects: this.state.projects});
  };

  render() {

    return (
      <Page
        className="AllProjects"
      >
        {this.state.loading ? <div><CircleLoader loading={this.state.loading} css={override} size={100} /></div>
          :
          <div>
            <Col>
              <Card>
                <SearchBar
                  value={this.state.searched}
                  onChange={(searchVal) => this.requestSearch(searchVal)}
                  onCancelSearch={() => this.cancelSearch()}
                />
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
                        this.state.filterAbleProjects.map(function (item, index) {
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
                        this.state.filterAbleProjects.map(function (item, index) {
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
          </div>}
      </Page>
    );
  }
}
export default AllProjects;
