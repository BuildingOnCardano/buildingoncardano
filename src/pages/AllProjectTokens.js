import Page from 'components/Page';
import React from 'react';
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Row
} from 'reactstrap';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrl, getAllProjectsTokens } from '../assets/services';
import "../styles/styles.css";
import { removeUserSession } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';
import SearchBar from "material-ui-search-bar";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import { Line, Bar, Pie } from "react-chartjs-2";
import CircularImage from 'utils/CircularImage';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});

const columns = [
  {
    field: 'project', flex: 1,
    renderHeader: (params) => (
      <h2>
        {'Project'}
      </h2>
    )
  },
  {
    field: 'policy_id', flex: 1,
    renderHeader: (params) => (
      <h2>
        {'Policy ID'}
      </h2>
    ),
  },
  {
    field: 'token', flex: 1,
    renderHeader: (params) => (
      <h2>
        {'Name'}
      </h2>
    ),
  },
  {
    field: 'supply', flex: 1, renderHeader: (params) => (
      <h2>
        {'Supply'}
      </h2>
    ),
  },
  {
    field: 'transactions', flex: 1, renderHeader: (params) => (
      <h2>
        {'Transactions'}
      </h2>
    ),
  },
  {
    field: 'wallets', flex: 1, renderHeader: (params) => (
      <h2>
        {'Wallets'}
      </h2>
    ),
  },
  {
    field: 'date', flex: 1, renderHeader: (params) => (
      <h2>
        {'Creation Date'}
      </h2>
    ),
  },
];

const columnsMobile = [
  {
    field: 'project', flex: 1,
    renderHeader: (params) => (
      <h5>
        {'Project'}
      </h5>
    )
  },
  {
    field: 'token', flex: 1,
    renderHeader: (params) => (
      <h5>
        {'Name'}
      </h5>
    ),
  },
  {
    field: 'wallets', flex: 1, renderHeader: (params) => (
      <h5>
        {'Wallets'}
      </h5>
    ),
  },
];

class AllProjectTokens extends React.Component {
  state = {
    projects: null,
    loading: true,
    totalProjects: '',
    projectTypesAndCount: [],
    smallScreen: false,
    searched: "",
    filterAbleProjects: null,
    barChartData: null,
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
      var response = await fetch(baseUrl + getAllProjectsTokens);
      const data = await response.json();
      console.log(data);
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

  createRows(data) {
    var rows = [];

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      var row = {
        id: index, project: item.project_name, token: item.asset_name, policy_id: item.policy_id,  supply: Number(item.total_supply), 
        transactions: Number(item.total_transactions), wallets: Number(item.total_wallets), date: item.creation_time
      };
      rows.push(row);
    }
    this.setState({ projects: rows, loading: false, filterAbleProjects: rows })
  }

  handleRowClick(rowData) {
    var url = "/projectdetails/" + rowData.project;
    this.props.history.push(url);
  }

  render() {

    return (
      <Page
        className="AllProjects"
        // title="All Projects"
      >
        {this.state.loading ? <div><CircleLoader loading={this.state.loading} css={override} size={100} /></div>
          :
          <div>
            <Col>
              <small><b>Use the search bar to find the project your are looking for, or filter on each individual column.</b></small>
              <Card>
                <SearchBar
                  value={this.state.searched}
                  onChange={(searchVal) => this.requestSearch(searchVal)}
                  onCancelSearch={() => this.cancelSearch()}
                />
                <div style={{ height: '140vh', width: '100%' }} className={useStyles.root}>
                  {this.state.smallScreen ? <DataGrid
                    rowHeight={50}
                    rows={this.state.filterAbleProjects}
                    columns={columnsMobile}
                    onRowClick={(rowData) => this.handleRowClick(rowData.row)} />
                    :
                    <DataGrid
                      rowHeight={60}
                      rows={this.state.filterAbleProjects}
                      columns={columns}
                      onRowClick={(rowData) => this.handleRowClick(rowData.row)} />}
                </div>

              </Card>
            </Col>
          </div>}
      </Page>
    );
  }
}
export default AllProjectTokens;
