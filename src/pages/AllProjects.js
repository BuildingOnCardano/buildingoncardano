import Page from 'components/Page';
import React from 'react';
import {
  Card,
  Col
} from 'reactstrap';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrl, getAllProjects, getProjectsStats } from '../assets/services';
import "../styles/styles.css";
import { removeUserSession } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';
import SearchBar from "material-ui-search-bar";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';

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
    field: 'icon',
    renderHeader: (params) => (
      <h2>
        {'Icon'}
      </h2>
    ),
    flexGrow: 1.0,
    renderCell: (params) => (
      <img
        src={params.value}
        className="rounded"
        style={{ width: "8vh", height: "8vh", marginRight: "10px" }}
      />
    ),
    headerClassName: 'super-app-theme--header',
    sortable: false,
  },
  {
    field: 'project', flex: 1,
    renderHeader: (params) => (
      <h2>
        {'Project'}
      </h2>
    )
  },
  {
    field: 'type', flex: 1,
    renderHeader: (params) => (
      <h2>
        {'Type'}
      </h2>
    ),
  },
  {
    field: 'tokentype', flex: 1,
    renderHeader: (params) => (
      <h2>
        {'Token Type'}
      </h2>
    ),
  },
  {
    field: 'ticker', flex: 1, renderHeader: (params) => (
      <h2>
        {'Ticker'}
      </h2>
    ),
  },
  {
    field: 'stage', flex: 1, renderHeader: (params) => (
      <h2>
        {'Stage'}
      </h2>
    ),
  },
];

const columnsMobile = [
  {
    field: 'icon',
    renderHeader: (params) => (
      <h2>
        {'Icon'}
      </h2>
    ),
    flexGrow: 1.0,
    renderCell: (params) => (
      <img
        src={params.value}
        className="rounded"
        style={{ width: "8vh", height: "8vh", marginRight: "10px" }}
      />
    ),
    headerClassName: 'super-app-theme--header',
    sortable: false,
  },
  {
    field: 'project', flex: 1,
    renderHeader: (params) => (
      <h2>
        {'Project'}
      </h2>
    )
  },
  {
    field: 'type', flex: 1,
    renderHeader: (params) => (
      <h2>
        {'Type'}
      </h2>
    ),
  },
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

  createRows(data) {
    var rows = [];

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      var row = {
        icon: item.imageUrl, id: index, project: item.name, type: item.type, tokentype: item.tokenType, ticker: item.ticker, stage: item.stage
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
        title="All Projects"
      >
        {this.state.loading ? <div><CircleLoader loading={this.state.loading} css={override} size={100} /></div>
          :
          <div>
            <Col>
            <small>Use the search bar to find the project your are looking for or filter on each individual column.</small>
              <Card>
                
                <SearchBar
                  value={this.state.searched}
                  onChange={(searchVal) => this.requestSearch(searchVal)}
                  onCancelSearch={() => this.cancelSearch()}
                />
                <div style={{ height: '70vh', width: '100%' }} className={useStyles.root}>
                  {this.state.smallScreen ? <DataGrid
                    rowHeight={70}
                    rows={this.state.filterAbleProjects}
                    columns={columnsMobile}
                    onRowClick={(rowData) => this.handleRowClick(rowData.row)} />
                    :
                    <DataGrid
                      rowHeight={70}
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
export default AllProjects;
