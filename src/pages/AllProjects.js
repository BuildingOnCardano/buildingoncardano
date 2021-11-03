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
import { baseUrl, getAllProjects, getProjectsStats } from '../assets/services';
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
    field: 'icon',
    renderHeader: (params) => (
      <h2>
        {'Icon'}
      </h2>
    ),
    flexGrow: 1.0,
    renderCell: (params) => (
      // <img
      //   src={params.value}
      //   className="rounded"
      //   style={{ width: "8vh", height: "8vh", marginRight: "10px" }}
      // />
      <CircularImage imageUrl={params.value} height={"6vh"} width={"6vh"} />
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
      // <img
      //   src={params.value}
      //   className="rounded"
      //   style={{ width: "8vh", height: "8vh", marginRight: "10px" }}
      // />
      <CircularImage imageUrl={params.value} height={"4vh"} width={"4vh"} />
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

    this.getProjectsStats();
    this.getAllProjects();
  }

  async getAllProjects() {
    try {
      var response = await fetch(baseUrl + getAllProjects);
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

      var chartData = {
        labels: labels,
        datasets: [
          {
            label: '# of Types',
            data: counts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(31,179,124, 0.6)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.4)',
              'rgba(144,14,249, 0.6)',
              'rgba(54, 162, 0, 0.8)',
              'rgba(255, 100, 86, 0.2)',
              'rgba(165,239,83, 0.4)',
              'rgba(120, 102, 255, 0.6)',
              'rgba(164,113,111, 0.8)',
              'rgba(178,135,21, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(31,179,124, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(144,14,249, 1 )',
              'rgba(54, 162, 0, 1)',
              'rgba(255, 100, 86, 1)',
              'rgba(165,239,83, 1)',
              'rgba(120, 102, 255, 1)',
              'rgba(164,113,111, 1)',
              'rgba(178,135,21, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      this.setState({ totalProjects: data.totalProjects, projectTypesAndCount: data.projectTypesAndCount, barChartData: chartData });
      this.state.projectTypesAndCount = data.projectTypesAndCount;

    } catch (error) {
      console.log(error)
    }
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

              {this.state.smallScreen != true && <div className="chart">
                <Bar
                  data={this.state.barChartData} height={50}
                // options={this.state.barChartData.options}
                />
              </div>}


              <small><b>Use the search bar to find the project your are looking for, or filter on each individual column.</b></small>
              <Card>

                <SearchBar
                  value={this.state.searched}
                  onChange={(searchVal) => this.requestSearch(searchVal)}
                  onCancelSearch={() => this.cancelSearch()}
                />
                <div style={{ height: '140vh', width: '100%' }} className={useStyles.root}>
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
