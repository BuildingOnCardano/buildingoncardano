import Page from 'components/Page';
import React from 'react';
import {
  Card,
  Col,
} from 'reactstrap';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrl, liveAndUpcomingProjectSales } from '../assets/services';
import "../styles/styles.css";
import { removeUserSession } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';
import SearchBar from "material-ui-search-bar";
import { DataGrid } from '@material-ui/data-grid';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;

const columns = [
  // {
  //   field: 'icon', headerName: 'Icon', width: 150, renderCell: (params) => (
  //     <img
  //       src={params.value}
  //       className="rounded"
  //       style={{ width: "5vh", height: "5vh", marginRight: "10px" }}
  //     />
  //   ),
  // },
  { field: 'project', headerName: 'Project', width: 150 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'salestatus', headerName: 'Status', width: 150 },
  { field: 'startdate', headerName: 'Start Date', width: 150 },
  { field: 'enddate', headerName: 'End Date', width: 150 },
  { field: 'acceptedfunding', headerName: 'Accepted Funding', width: 150 },
  { field: 'tokenprice', headerName: 'Token Price', width: 150 },
];

class AllSales extends React.Component {
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

    this.getAllSales();
  }

  async getAllSales() {
    try {
      var response = await fetch(baseUrl + liveAndUpcomingProjectSales);
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
      var row = { //icon: item.imageUrl, 
        id: index, project: item.projectName, type: item.upcomingSale, salestatus: item.saleStatus, startdate: item.saleStartDate,
        enddate: item.saleEndDate, acceptedfunding: item.acceptedFunding, tokenprice: item.saleTokenPrice
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
        className="AllSales"
        title="Live and Upcoming Sales"
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
export default AllSales;
