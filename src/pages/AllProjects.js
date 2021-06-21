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
import { TableRow, TableCell, TableHead, TableBody, TableContainer, TableSortLabel } from '@material-ui/core';
import "../styles/styles.css";
import Paper from '@material-ui/core/Paper';
import { removeUserSession } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';
import SearchBar from "material-ui-search-bar";
import { DataGrid } from '@material-ui/data-grid';
import { Redirect } from "react-router-dom";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;



const columns = [
  { field: 'project', headerName: 'Project', width: 150 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'tokentype', headerName: 'Token Type', width: 150 },
  { field: 'ticker', headerName: 'Ticker', width: 150 },
  { field: 'stage', headerName: 'Stage', width: 150 },
];

class AllProjects extends React.Component {
  state = {
    projects: null,
    loading: true,
    totalProjects: '',
    projectTypesAndCount: [],
    smallScreen: false,
    searched: "",
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
      this.createRows(data);
    } catch (error) {
      console.log(error)
    }
  }

  requestSearch(searchedVal) {
    this.setState({ searched: searchedVal });
    if (isEmpty(searchedVal)) {
      this.cancelSearch();
    } else {
      const filteredRows = this.state.filterAbleProjects.filter((row) => {
        return row.project.toLowerCase().includes(searchedVal.toLowerCase());
      });
      this.setState({ filterAbleProjects: filteredRows });
    }
  };

  cancelSearch = () => {
    this.setState({ searched: null, filterAbleProjects: this.state.projects });
  };

  handleTableSort = property => event => {
    console.log("clicked");
    console.log(event);
  }

  createRows(data) {
    var rows = [];

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      var row = {
        id: index, project: item.name, type: item.type, tokentype: item.tokenType, ticker: item.ticker, stage: item.stage
      };
      rows.push(row);
    }
    this.setState({ projects: rows, loading: false, filterAbleProjects: rows })
  }

  handleRowClick(rowData){
    // console.log(rowData);
    this.setState({ redirect: rowData.project})
  }

  renderRedirectToProject = () => {
    if (!isEmpty(this.state.redirect)) {
      var url = "/projectdetails/"+this.state.redirect;
      this.setState({ redirect: ""});
      return <Redirect to={{ pathname: url }} />;
    }
  }


  render() {

    return (
      <Page
        className="AllProjects"
      >
        {this.renderRedirectToProject()}
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
                <div style={{ height: '70vh', width: '100%' }}>
                  <DataGrid rows={this.state.filterAbleProjects} columns={columns} 
                  onRowClick={(rowData) => this.handleRowClick(rowData.row)} />
                </div>

              </Card>
            </Col>
          </div>}
      </Page>
    );
  }
}
export default AllProjects;
